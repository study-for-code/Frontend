import { UserWithdrawContainer } from "@/styles/admin/userWithDrawralStyles";

const UserWithdrawral = () => {
  return (
    <div className="content">
      <UserWithdrawContainer>
        <span className="title">유저 탈퇴</span>
        <div className="userList"></div>
      </UserWithdrawContainer>
    </div>
  );
};

export default UserWithdrawral;
