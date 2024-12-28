import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import supabase from "../utils/supabase";
import { useEffect, useState } from "react";
import { Session } from "@supabase/supabase-js";
import { Outlet } from "react-router";
import styled from "styled-components";

const StyledAuth = styled(Auth)`
  width: 2000px;
`;

const Login = () => {
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  if (!session) {
    return (
      <StyledAuth supabaseClient={supabase} appearance={{ theme: ThemeSupa }} />
    );
  } else {
    return <Outlet />;
  }
};

export default Login;
