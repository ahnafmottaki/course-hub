const LoginAndRegister = ({ label, children }) => {
  return (
    <section className="section  min-h-[calc(100dvh-66px)]  flex justify-center items-center">
      <div className="max-w-md w-full min-w-xs">
        <h1 className="text-4xl font-bold text-indigo-600 text-center mb-5 animate__animated animate__fadeIn">
          {label}
        </h1>
        {children}
      </div>
    </section>
  );
};

export default LoginAndRegister;
