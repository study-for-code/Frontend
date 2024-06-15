export const problemList = [
  {
    subjectName: "치킨 배달",
    subjectNumber: 15686, // 문제 번호
    algorithmType: "스택", // 알고리즘 종류
    problemDescription:
      '크기가 N*N인 도시가 있다. 도시는 1*1크기의 칸으로 나누어져 있다. 도시의 각 칸은 빈 칸, 치킨집, 집 중 하나이다. 도시의 칸은 (r, c)와 같은 형태로 나타내고, r행 c열 또는 위에서부터 r번째 칸, 왼쪽에서부터 c번째 칸을 의미한다. r과 c는 1부터 시작한다.이 도시에 사는 사람들은 치킨을 매우 좋아한다. 따라서, 사람들은 "치킨거리"라는 말을 주로 사용한다. 치킨 거리는 0 이상의 자연수이며, 집과 가장 가까운 치킨집 사이의 거리이다. 즉, 치킨 거리는 집을 기준으로 정해지며, 각각의 집은 치킨 거리를 가지고 있다. 도시의 치킨 거리는 모든 집의 치킨 거리의 합이다.임의의 두 칸 (r1, c1)과 (r2, c2) 사이의 거리는 |r1-r2| + |c1-c2|로 구한다.예를 들어, 아래와 같은 지도를 갖는 도시를 살펴보자.```0 2 0 1 0\n1 0 1 0 0 \n0 0 0 0 0 \n0 0 0 1 1 \n0 0 0 1 2\n```0은 빈 칸, 1은 집, 2는 치킨집이다. (2, 1)에 있는 집과 (1, 2)에 있는 치킨집과의 거리는 |2-1| + |1-2| = 2, (5, 5)에 있는 치킨집과의 거리는 |2-5| + |1-5| = 7이다. 따라서, (2, 1)에 있는 집의 치킨 거리는 2이다.(5, 4)에 있는 집과 (1, 2)에 있는 치킨집과의 거리는 |5-1| + |4-2| = 6, (5, 5)에 있는 치킨집과의 거리는 |5-5| + |4-5| = 1이다. 따라서, (5, 4)에 있는 집의 치킨 거리는 1이다.이 도시에 있는 치킨집은 모두 같은 프랜차이즈이다. 프렌차이즈 본사에서는 수익을 증가시키기 위해 일부 치킨집을 폐업시키려고 한다. 오랜 연구 끝에 이 도시에서 가장 수익을 많이 낼 수 있는 치킨집의 개수는 최대 M개라는 사실을 알아내었다.도시에 있는 치킨집 중에서 최대 M개를 고르고, 나머지 치킨집은 모두 폐업시켜야 한다. 어떻게 고르면, 도시의 치킨 거리가 가장 작게 될지 구하는 프로그램을 작성하시오.',
    timeLimit: 1000, //  시간 제한
    memorySize: 512, // 메모리 사이즈
    answerRate: 46.059, // 정답 비율
    solveTime: "20:00", // 풀이 시간
  },
  {
    subjectName: "피보나치 함수",
    subjectNumber: 1003,
    algorithmType: "DP 알고리즘", // 알고리즘 종류
    problemDescription:
      "다음 소스는 N번째 피보나치 수를 구하는 C++ 함수이다.fibonacci(3)을 호출하면 다음과 같은 일이 일어난다.fibonacci(3)은 fibonacci(2)와 fibonacci(1) (첫 번째 호출)을 호출한다.fibonacci(2)는 fibonacci(1) (두 번째 호출)과 fibonacci(0)을 호출한다.두 번째 호출한 fibonacci(1)은 1을 출력하고 1을 리턴한다.fibonacci(0)은 0을 출력하고, 0을 리턴한다.fibonacci(2)는 fibonacci(1)과 fibonacci(0)의 결과를 얻고, 1을 리턴한다.첫 번째 호출한 fibonacci(1)은 1을 출력하고, 1을 리턴한다.fibonacci(3)은 fibonacci(2)와 fibonacci(1)의 결과를 얻고, 2를 리턴한다.1은 2번 출력되고, 0은 1번 출력된다. N이 주어졌을 때, fibonacci(N)을 호출했을 때, 0과 1이 각각 몇 번 출력되는지 구하는 프로그램을 작성하시오.",
    timeLimit: 250,
    memorySize: 128,
    answerRate: 33.339,
    solveTime: "25:00",
  },
  {
    subjectName: "굿점원",
    subjectNumber: 1003,
    algorithmType: "DFS/BFS",
    problemDescription:
      "띵동~“누구세요?”“치킨배달 왔습니다.”“음? 치킨을 시킨 적이 없… 으아악!”손님이 주문하지도 않은 치킨을 배달해 주는 인호는 굿-점원이다. 인호는 아래 그림과 같이 일자로 난 길을 따라 손님들에게 차례로 치킨을 선물해주고 있다.어느 날 치킨을 배달해야 할 집이 하나 늘었다. 인호는 새로운 손님에게 치킨을 배달하기 위해 길을 딱 하나만 만들려고 한다. 인호의 친구들은 각자 자기가 만들 수 있는 길을 알려주었다.인호는 치킨가게를 0번 집, 그리고 가게와 가까운 집부터 차례대로 1번 집부터 n번 집이라고 부른다.인호는 0번 집(가게)에서 시작해 1번부터 N번까지 모든 집과 새로운 집을 방문해야 한다.인호는 길을 따라 걸으며 새로 만드는 길과 연결된 집에서만 방향을 바꿀 수 있다. 그리고 막다른 길에 다다르면 되돌아간다.인호는 배달을 마친 후 친구가 만들어 준 길을 다 걷지 않았다면 마저 걸어야 한다.인호가 가장 조금 걷고 치킨배달을 마칠 수 있는 거리를 구해 보자.",
    timeLimit: 1000,
    memorySize: 128,
    answerRate: 16.45,
    solveTime: "30:00",
  },
  {
    subjectName: "어린 왕자",
    subjectNumber: 1004,
    algorithmType: "DP 알고리즘", // 알고리즘 종류
    problemDescription:
      "어린 왕자는 소혹성 B-664에서 자신이 사랑하는 한 송이 장미를 위해 살아간다. 어느 날 장미가 위험에 빠지게 된 것을 알게 된 어린 왕자는, 장미를 구하기 위해 은하수를 따라 긴 여행을 하기 시작했다. 하지만 어린 왕자의 우주선은 그렇게 좋지 않아서 행성계 간의 이동을 최대한 피해서 여행해야 한다. 아래의 그림은 어린 왕자가 펼쳐본 은하수 지도의 일부이다.",
    timeLimit: 1000,
    memorySize: 128,
    answerRate: 46.24,
    solveTime: "20:00",
  },
];