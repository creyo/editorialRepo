import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import supabase from '../config/supabase';

function Logout() {
  const navigate = useNavigate();

  useEffect(() => {
    async function logout() {
      await supabase.auth.signOut();
      localStorage.removeItem("sb-narivuecshkbtcueblcl-auth-token");
      navigate('/login');
    }

    logout();
  }, [navigate]);

  return <div>Logging out...</div>;
}

export default Logout;
