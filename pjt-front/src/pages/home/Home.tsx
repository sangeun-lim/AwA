import { useSelector } from "react-redux";
import { User } from "../../Interface";
import LoggedInHome from "./LoggedInHome";
import NotLoggedInHome from "./NotLoggedInHome";
import style from "./Home.module.css";

function Home(): JSX.Element {
  const userObject = useSelector(
    (state: { userObject: User | null }) => state.userObject
  );

  return (
    <>
      <header className={style.Header}>
        <div>캐러셀?</div>
      </header>
      {userObject ? (
        <LoggedInHome></LoggedInHome>
      ) : (
        <NotLoggedInHome></NotLoggedInHome>
      )}
    </>
  );
}

export default Home;
