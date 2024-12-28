import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import supabase from "../utils/supabase";
import { useEffect, useState } from "react";
import { Session } from "@supabase/supabase-js";
import { Outlet } from "react-router";
import styled from "styled-components";

const StyledAuth = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
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

    localStorage.setItem("email", session?.user?.email ?? "");

    return () => subscription.unsubscribe();
  }, [session?.user?.email]);

  if (!session) {
    return (
      <StyledAuth>
        <Auth
          supabaseClient={supabase}
          appearance={{
            theme: ThemeSupa,

            style: {
              container: { width: "500px" },
            },
          }}
        />
      </StyledAuth>
    );
  } else {
    return <Outlet />;
  }
};

export default Login;
