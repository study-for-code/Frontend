// img
import SocialLoginBtn from "@/assets/login/social_kakao.png";

const KakaoBtnSection = () => {
  return (
    <div className="kakaoBtnContainer">
      <img src={SocialLoginBtn} className="kakaoBtn" />
      <span>카카오 로그인</span>
      <div></div>
    </div>
  );
};

export default KakaoBtnSection;
