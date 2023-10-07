const CURRENT_YEAR = new Date().getFullYear();

export const Footer = () => (
  <div className="app-container z-50 flex w-full items-center justify-between bg-dark py-4">
    <div className="flex flex-col space-y-3 ">
      <span>© 2022-{CURRENT_YEAR}, КиндКино.</span>
      <span className="text-sm opacity-75">
          Проект может содержать информацию, не предназначенную для
          несовершеннолетних.
      </span>
    </div>
  </div>
);
