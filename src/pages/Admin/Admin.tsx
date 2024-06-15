import { createContext, useState } from "react";
// styles
import { AdminContainer } from "@/styles/admin/adminStyles";

// img

// components
import CreateProblems from "@/components/admin/CreateProblems";
import ManageProblems from "@/components/admin/ManageProblems";
import UserWithdrawral from "@/components/admin/UserWithdrawral";

// types
import { AdminComponentType } from "@/types/aboutAdmin";

// Context 생성
interface TestCaseModalContextType {
  testCaseModal: boolean;
  setTestCaseModal: React.Dispatch<React.SetStateAction<boolean>>;
}

export const TestCaseModalContext = createContext<TestCaseModalContextType>({
  testCaseModal: false,
  setTestCaseModal: () => {},
});

const Admin = () => {
  // 페이지 컨트롤
  const [page, setPage] = useState<string>("createProblems");

  // 테스트 케이스 모달
  const [testCaseModal, setTestCaseModal] = useState<boolean>(false);

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
    <AdminContainer testcasemodal={testCaseModal}>
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
        <TestCaseModalContext.Provider
          value={{ testCaseModal, setTestCaseModal }}
        >
          <div className="contentSection">{componentToShow}</div>
        </TestCaseModalContext.Provider>
      </main>
    </AdminContainer>
  );
};

export default Admin;
