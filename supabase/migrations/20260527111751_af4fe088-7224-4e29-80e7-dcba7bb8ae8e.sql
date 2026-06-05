
-- Roles
CREATE TYPE public.app_role AS ENUM ('admin', 'user');

CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role public.app_role NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (user_id, role)
);
GRANT SELECT ON public.user_roles TO authenticated;
GRANT ALL ON public.user_roles TO service_role;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role public.app_role)
RETURNS BOOLEAN LANGUAGE SQL STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = _user_id AND role = _role)
$$;

CREATE POLICY "Users view own roles" ON public.user_roles FOR SELECT TO authenticated
  USING (auth.uid() = user_id OR public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins manage roles" ON public.user_roles FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- Updated at trigger
CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS TRIGGER LANGUAGE plpgsql AS $$
BEGIN NEW.updated_at = now(); RETURN NEW; END; $$;

-- Posts
CREATE TABLE public.posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  category TEXT,
  summary TEXT,
  content TEXT,
  cover_image_url TEXT,
  published BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT ON public.posts TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.posts TO authenticated;
GRANT ALL ON public.posts TO service_role;
ALTER TABLE public.posts ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone view published posts" ON public.posts FOR SELECT TO anon, authenticated
  USING (published = true OR public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins insert posts" ON public.posts FOR INSERT TO authenticated
  WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins update posts" ON public.posts FOR UPDATE TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins delete posts" ON public.posts FOR DELETE TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));
CREATE TRIGGER posts_updated_at BEFORE UPDATE ON public.posts
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- Contacts
CREATE TABLE public.contacts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT,
  phone TEXT,
  subject TEXT,
  message TEXT NOT NULL,
  read BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT INSERT ON public.contacts TO anon, authenticated;
GRANT SELECT, UPDATE, DELETE ON public.contacts TO authenticated;
GRANT ALL ON public.contacts TO service_role;
ALTER TABLE public.contacts ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone submit contact" ON public.contacts FOR INSERT TO anon, authenticated
  WITH CHECK (true);
CREATE POLICY "Admins view contacts" ON public.contacts FOR SELECT TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins update contacts" ON public.contacts FOR UPDATE TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins delete contacts" ON public.contacts FOR DELETE TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

-- Settings
CREATE TABLE public.settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  key TEXT UNIQUE NOT NULL,
  value TEXT,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT ON public.settings TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.settings TO authenticated;
GRANT ALL ON public.settings TO service_role;
ALTER TABLE public.settings ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone view settings" ON public.settings FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "Admins manage settings" ON public.settings FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE TRIGGER settings_updated_at BEFORE UPDATE ON public.settings
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- Seed posts
INSERT INTO public.posts (title, slug, category, summary, content, published) VALUES
('Endometriose não é o fim do sonho de engravidar', 'endometriose-fertilidade', 'Ginecologia',
 'Entenda como o diagnóstico precoce e o tratamento correto podem preservar sua fertilidade.',
 E'## Endometriose e fertilidade\n\nA endometriose é uma condição comum que afeta milhões de mulheres, mas o diagnóstico não significa o fim do sonho de ser mãe. Com acompanhamento adequado, tratamentos modernos e atenção integral, muitas pacientes conseguem engravidar de forma natural ou com suporte da medicina reprodutiva.\n\n### Diagnóstico precoce\n\nO primeiro passo é reconhecer os sintomas: cólicas intensas, dor pélvica crônica e desconforto durante relações sexuais. Procurar uma ginecologista o quanto antes faz toda a diferença.\n\n### Tratamento personalizado\n\nCada caso é único — o plano terapêutico pode envolver medicamentos hormonais, cirurgia minimamente invasiva e acompanhamento contínuo da fertilidade.', true),
('Tudo o que você precisa saber sobre o pré-natal', 'guia-pre-natal', 'Pré-natal',
 'Da primeira consulta ao parto, um guia completo para uma gestação tranquila e segura.',
 E'## O pré-natal humanizado\n\nO pré-natal é muito mais do que exames e ultrassons — é o tempo de cuidar do corpo, da mente e do vínculo com o bebê que está chegando. Em cada consulta, conversamos sobre suas dúvidas, monitoramos a saúde da mãe e do bebê e construímos juntas um plano de parto que respeite seus desejos.\n\n### O que esperar\n\n- Consultas mensais até a 28ª semana\n- Quinzenais entre 28 e 36 semanas\n- Semanais a partir da 36ª semana\n\n### Exames essenciais\n\nUltrassom morfológico, exames laboratoriais e avaliação contínua do bem-estar materno-fetal.', true),
('Implanon: praticidade ou efeitos colaterais?', 'implanon-pros-contras', 'Contracepção',
 'Conheça os prós, contras e o que esperar do implante contraceptivo subdérmico.',
 E'## Implanon\n\nO Implanon é um método contraceptivo de longa duração, prático e altamente eficaz. Mas, como todo medicamento, exige acompanhamento médico e avaliação individual.\n\n### Vantagens\n\n- Eficácia superior a 99%\n- Duração de até 3 anos\n- Discrição e praticidade\n\n### O que considerar\n\nAlterações no ciclo menstrual, sensibilidade no local da inserção e a importância de um acompanhamento regular com sua ginecologista.', true),
('Você conhece de verdade o seu útero?', 'conheca-seu-utero', 'Saúde Feminina',
 'Anatomia, ciclo menstrual, sinais de alerta e tudo que toda mulher deveria saber sobre seu corpo.',
 E'## O autoconhecimento como cuidado\n\nConhecer o próprio corpo é o primeiro passo para uma vida saudável. O útero é um órgão extraordinário, capaz de transformações incríveis ao longo da vida.\n\n### Ciclo menstrual\n\nUm ciclo regular reflete o equilíbrio hormonal. Acompanhar suas características ajuda a identificar precocemente qualquer alteração.\n\n### Sinais de alerta\n\nSangramento intenso, cólicas incapacitantes ou dor fora do período menstrual merecem investigação.', true),
('Laser íntimo: aliado da saúde feminina depois dos 40', 'laser-intimo-40', 'Saúde Íntima',
 'Descubra como o laser vaginal pode ajudar na atrofia, incontinência e qualidade de vida sexual.',
 E'## Laser íntimo\n\nA partir dos 40 anos, alterações hormonais podem causar atrofia vaginal, ressecamento e desconforto. O laser íntimo é uma tecnologia segura e eficaz que ajuda a recuperar o conforto e a qualidade de vida.\n\n### Como funciona\n\nO laser estimula a produção de colágeno na mucosa vaginal, melhorando a lubrificação, a elasticidade e até quadros leves de incontinência urinária.\n\n### Indicações\n\nMenopausa, pós-parto, ressecamento e atrofia. A indicação sempre passa por avaliação ginecológica individualizada.', true);

-- Default settings
INSERT INTO public.settings (key, value) VALUES
('whatsapp', '5537994219291'),
('email', 'contato@dralaraganem.com.br'),
('hours', 'Segunda a Sexta: 08h às 18h | Sábados: 08h às 12h');

-- Storage bucket for blog images
INSERT INTO storage.buckets (id, name, public) VALUES ('blog-images', 'blog-images', true)
ON CONFLICT (id) DO NOTHING;

CREATE POLICY "Public read blog images" ON storage.objects FOR SELECT TO anon, authenticated
  USING (bucket_id = 'blog-images');
CREATE POLICY "Admins upload blog images" ON storage.objects FOR INSERT TO authenticated
  WITH CHECK (bucket_id = 'blog-images' AND public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins update blog images" ON storage.objects FOR UPDATE TO authenticated
  USING (bucket_id = 'blog-images' AND public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins delete blog images" ON storage.objects FOR DELETE TO authenticated
  USING (bucket_id = 'blog-images' AND public.has_role(auth.uid(), 'admin'));
