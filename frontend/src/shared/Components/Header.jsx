import { Link } from "react-router";

const Header = () => {
  return (
    <header className="border border-gray-950/10 py-4 bg-gray-50">
      <section className=" w-full max-w-6xl mx-auto">
        <Link to={"/"}>
          <div className="font-pt-sans font-bold text-2xl">CourseHub</div>
        </Link>
      </section>
    </header>
  );
};

export default Header;
