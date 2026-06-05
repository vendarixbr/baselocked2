import ginecologia from "@/assets/service-ginecologia.jpg";
import prenatal from "@/assets/service-prenatal.jpg";
import hormonal from "@/assets/service-hormonal.jpg";
import planejamento from "@/assets/service-planejamento.jpg";
import prevencao from "@/assets/service-prevencao.jpg";
import intima from "@/assets/service-intima.jpg";

export type Service = {
  slug: string;
  title: string;
  tagline: string;
  desc: string;
  image: string;
  intro: string;
  highlights: string[];
  faqs: { q: string; a: string }[];
};

export const services: Service[] = [
  {
    slug: "ginecologia-clinica",
    title: "Ginecologia Clínica",
    tagline: "Cuidado contínuo, do preventivo ao tratamento.",
    desc: "Consultas de rotina, exames preventivos, diagnóstico e tratamento das principais condições ginecológicas.",
    image: ginecologia,
    intro:
      "A consulta ginecológica é o ponto de partida para uma vida com mais saúde e tranquilidade. Avalio cada paciente de forma integral, com escuta atenta e linguagem clara, para construir um plano de cuidado individualizado.",
    highlights: [
      "Consultas de rotina e check-up anual",
      "Papanicolau e colposcopia",
      "Diagnóstico e tratamento de infecções",
      "Acompanhamento do ciclo menstrual",
      "Cuidados com a saúde vaginal",
    ],
    faqs: [
      { q: "Com que frequência devo consultar?", a: "Recomenda-se ao menos uma consulta anual, mesmo sem queixas, para preventivo e check-up." },
      { q: "Preciso estar menstruada para a consulta?", a: "Não. A consulta pode ser feita em qualquer fase do ciclo, exceto se for solicitado exame específico." },
    ],
  },
  {
    slug: "pre-natal",
    title: "Pré-natal",
    tagline: "Uma gestação acompanhada com técnica e afeto.",
    desc: "Acompanhamento completo da gestação de baixo e alto risco, com escuta, exames e suporte emocional.",
    image: prenatal,
    intro:
      "O pré-natal é uma jornada única, e cada gestação merece um cuidado próprio. Realizo o acompanhamento completo, integrando ciência, segurança e acolhimento em cada etapa.",
    highlights: [
      "Consultas mensais com escuta ativa",
      "Acompanhamento de gestação de baixo e alto risco",
      "Solicitação e leitura de exames",
      "Orientação nutricional e emocional",
      "Preparo para o parto e pós-parto",
    ],
    faqs: [
      { q: "Quando começar o pré-natal?", a: "O ideal é iniciar assim que confirmada a gestação, preferencialmente nas primeiras 8 semanas." },
      { q: "Atende gestação de alto risco?", a: "Sim, com acompanhamento próximo e articulação com outras especialidades quando necessário." },
    ],
  },
  {
    slug: "saude-hormonal",
    title: "Saúde Hormonal",
    tagline: "Equilíbrio para cada fase da vida.",
    desc: "Investigação e tratamento de desequilíbrios hormonais, SOP, endometriose, TPM e menopausa.",
    image: hormonal,
    intro:
      "Os hormônios influenciam corpo, mente e bem-estar. Investigo a fundo causas e sintomas para devolver equilíbrio, energia e qualidade de vida.",
    highlights: [
      "Síndrome dos Ovários Policísticos (SOP)",
      "Endometriose e adenomiose",
      "TPM e TDPM",
      "Climatério e menopausa",
      "Reposição hormonal individualizada",
    ],
    faqs: [
      { q: "Toda mulher precisa repor hormônios?", a: "Não. A indicação é individual, considerando sintomas, exames e histórico pessoal." },
      { q: "Quais exames são solicitados?", a: "Depende do quadro: dosagens hormonais, ultrassom e exames complementares quando necessário." },
    ],
  },
  {
    slug: "planejamento-reprodutivo",
    title: "Planejamento Reprodutivo",
    tagline: "Você no controle das suas escolhas.",
    desc: "Orientação sobre métodos contraceptivos, DIU, Implanon e planejamento familiar.",
    image: planejamento,
    intro:
      "Cada mulher tem um momento de vida diferente. Apresento todas as opções com clareza para você escolher o método que mais combina com seu corpo e seus planos.",
    highlights: [
      "Inserção de DIU de cobre e hormonal",
      "Implanon (implante subcutâneo)",
      "Anticoncepcionais orais e injetáveis",
      "Métodos comportamentais",
      "Aconselhamento pré-gestacional",
    ],
    faqs: [
      { q: "DIU dói para colocar?", a: "Há desconforto, mas é breve. Conversamos sobre formas de analgesia para tornar o procedimento mais confortável." },
      { q: "Posso engravidar logo após retirar o método?", a: "Na maioria dos métodos, sim. A fertilidade retorna rapidamente após a suspensão." },
    ],
  },
  {
    slug: "prevencao-e-rastreamento",
    title: "Prevenção e Rastreamento",
    tagline: "Cuidar antes que algo aconteça.",
    desc: "Exames preventivos para câncer de colo do útero, mama e check-up feminino completo.",
    image: prevencao,
    intro:
      "A prevenção é o melhor cuidado. Mantenho protocolos atualizados de rastreamento para identificar precocemente qualquer alteração e proteger sua saúde a longo prazo.",
    highlights: [
      "Rastreamento de câncer de colo de útero",
      "Exames de mama e solicitação de mamografia",
      "Vacinação (HPV e outras)",
      "Check-up feminino completo",
      "Orientação sobre fatores de risco",
    ],
    faqs: [
      { q: "Com que idade começar o rastreamento?", a: "Varia conforme o exame e histórico familiar. Definimos juntas o protocolo ideal para você." },
      { q: "Quem já se vacinou para HPV precisa de Papanicolau?", a: "Sim. A vacina reduz, mas não elimina, a necessidade do exame preventivo." },
    ],
  },
  {
    slug: "saude-intima",
    title: "Saúde Íntima",
    tagline: "Bem-estar e autoestima em todas as fases.",
    desc: "Tratamento de desconfortos íntimos, laser íntimo, ninfoplastia e saúde sexual feminina.",
    image: intima,
    intro:
      "A saúde íntima impacta diretamente bem-estar, autoestima e qualidade de vida. Ofereço tratamentos modernos, seguros e personalizados, sem julgamentos.",
    highlights: [
      "Laser íntimo (rejuvenescimento e flacidez)",
      "Ninfoplastia",
      "Tratamento de secura vaginal",
      "Saúde sexual e libido",
      "Cuidados no pós-parto e menopausa",
    ],
    faqs: [
      { q: "O laser íntimo dói?", a: "É um procedimento confortável, realizado em consultório, sem necessidade de afastamento." },
      { q: "Quantas sessões são necessárias?", a: "Em média 3 sessões, mas o protocolo é personalizado conforme o objetivo." },
    ],
  },
];

export const getService = (slug: string) => services.find((s) => s.slug === slug);
