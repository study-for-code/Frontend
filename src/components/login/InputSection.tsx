// img
import showPassword from "@/assets/signup/eye.png";
import hidePassword from "@/assets/signup/eye-closed.png";

interface LoginType {
  inputData: (sort: string, value: string) => void;
  pwdState: boolean;
  setPwdState: React.Dispatch<React.SetStateAction<boolean>>;
}

const InputSection: React.FC<LoginType> = ({
  inputData,
  pwdState,
  setPwdState,
}) => {
  const handlePassword = () => {
    setPwdState(!pwdState);
  };
  return (
    <div className="inputContainer">
      <input
        className="inputEmail"
        type="text"
        placeholder="Email"
        onChange={(e) => inputData("email", e.target.value)}
      />

      <div className="inputCon">
        <input
          className="input2"
          type={pwdState ? "text" : "password"}
          placeholder="Password"
          onChange={(e) => inputData("password", e.target.value)}
        />
        <img
          src={pwdState ? hidePassword : showPassword}
          className="handlepwdIncon"
          onClick={handlePassword}
        />
      </div>
    </div>
  );
};

export default InputSection;
