import React from "react";

// styles
import { Container } from "@/styles/home/SubscribeStyles";

const AlgorithmList = () => {
  return (
    <Container>
      <nav className="title">알고리즘 목록</nav>
      <div className="contentArea">
        <div className="inputArea">
          <input type="text" placeholder="알고리즘 검색" />
        </div>
        <div className="week-text">1주차 문제</div>
        <table className="table">
          <thead>
            <tr>
              <th>번호</th>
              <th>문제 제목</th>
              <th>분류</th>
              <th>푼 사람</th>
              <th>상태</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>9012</td>
              <td>괄호</td>
              <td>스택</td>
              <td></td>
              <td>+</td>
            </tr>
            {/* {problems.map((problem) => (
            <tr key={problem.id}>
              <td>{problem.id}</td>
              <td>{problem.title}</td>
              <td>{problem.category}</td>
              <td>
                {problem.solvedBy.map((solver, index) => (
                  <div key={index} className="solver" />
                ))}
              </td>
              <td>{problem.status === "solved" ? "✔️" : "➕"}</td>
            </tr>
          ))} */}
          </tbody>
        </table>
      </div>
    </Container>
  );
};

export default AlgorithmList;
