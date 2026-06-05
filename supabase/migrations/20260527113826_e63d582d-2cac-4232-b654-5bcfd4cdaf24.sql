-- Restrict public access to settings values that contain contact details
DROP POLICY IF EXISTS "Anyone view settings" ON public.settings;
DROP POLICY IF EXISTS "Admins manage settings" ON public.settings;
REVOKE SELECT ON public.settings FROM anon;

CREATE POLICY "Admins view settings"
ON public.settings
FOR SELECT
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins insert settings"
ON public.settings
FOR INSERT
TO authenticated
WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins update settings"
ON public.settings
FOR UPDATE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'))
WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins delete settings"
ON public.settings
FOR DELETE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- Make role management intent explicit and admin-only
DROP POLICY IF EXISTS "Admins manage roles" ON public.user_roles;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.user_roles TO authenticated;

CREATE POLICY "Admins insert roles"
ON public.user_roles
FOR INSERT
TO authenticated
WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins update roles"
ON public.user_roles
FOR UPDATE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'))
WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins delete roles"
ON public.user_roles
FOR DELETE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- Keep the contact form public while making the policy specific and validated
DROP POLICY IF EXISTS "Anyone submit contact" ON public.contacts;

CREATE POLICY "Anyone submit valid contact"
ON public.contacts
FOR INSERT
TO anon, authenticated
WITH CHECK (
  char_length(btrim(name)) BETWEEN 2 AND 160
  AND char_length(btrim(message)) BETWEEN 5 AND 3000
  AND (email IS NULL OR email = '' OR email ~* '^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$')
  AND (phone IS NULL OR phone = '' OR char_length(regexp_replace(phone, '\D', '', 'g')) BETWEEN 10 AND 15)
  AND (subject IS NULL OR char_length(btrim(subject)) BETWEEN 1 AND 120)
);

-- Public buckets can serve known URLs without allowing anonymous listing of every object
DROP POLICY IF EXISTS "Public read blog images" ON storage.objects;