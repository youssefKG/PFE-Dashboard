import Breadcrumb from "../../components/common/breadcrumbs";
import ProfilePicture from "../../components/Profil/ProfilPicture";
import PersonalLocation from "../../components/Profil/personalLocation";
import PersonalInformation from "../../components/Profil/PersonalInformation";
import { useAuthContext } from "../../hooks/useContext";

const Profil = () => {
  const { user } = useAuthContext();
  return (
    <div className="flex flex-col p-4 gap-12">
      <div className="flex flex-col gap-2 ">
        <div>
          <h1 className="font-extrabold text-2xl">Profil</h1>
        </div>
        <Breadcrumb links={[{ value: "Profil", to: "/" }]} />
      </div>
      <ProfilePicture />
      <PersonalInformation user={user} />
      <PersonalLocation />
    </div>
  );
};

export default Profil;
