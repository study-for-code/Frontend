import { useState } from "react";
// styles
import {
  AdminContainer,
  LimitElmentInput,
  ProblemDetailInput,
} from "@/styles/admin/adminStyles";

// img
import profileImg from "@/assets/admin/casual_man.png";

// components
import CreateProblems from "@/components/admin/CreateProblems";
import ManageProblems from "@/components/admin/ManageProblems";
import UserWithdrawral from "@/components/admin/UserWithdrawral";

// types
import { AdminComponentType } from "@/types/aboutAdmin";

const Admin = () => {
  const [page, setPage] = useState<string>("createProblems");

  const componentMap: AdminComponentType = {
    createProblems: <CreateProblems />,
    manageProblems: <ManageProblems />,
    userWithdrawal: <UserWithdrawral />,
  };
  const componentToShow = componentMap[page];

  const showComponents = (pageType: string) => {
    setPage(pageType);
  };

  return (
    <AdminContainer>
      <nav>
        <div className="header">구름적사고</div>
      </nav>
      <main>
        <div className="list">
          <div className="sub_list">
            <div className="sub_title">문제</div>
            <div
              className="sub_element"
              onClick={() => showComponents("createProblems")}
            >
              문제 생성
            </div>
            <div
              className="sub_element"
              onClick={() => showComponents("manageProblems")}
            >
              문제 관리
            </div>
            <div
              className="sub_element"
              onClick={() => showComponents("userWithdrawal")}
            >
              유저 탈퇴
            </div>
          </div>
        </div>

        <div className="contentSection">{componentToShow}</div>
      </main>
    </AdminContainer>
  );
};

export default Admin;
