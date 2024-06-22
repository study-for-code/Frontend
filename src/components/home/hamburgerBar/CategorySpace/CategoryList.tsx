// image
import CategoryExpansion from "@/assets/home/category_expansion.png";
import CategoryExpansion2 from "@/assets/home/category_expansion2.png";

// types
import { PageKey, SpecificCategoryData } from "@/types/aboutHome";

// libraries
import { SetterOrUpdater } from "recoil";

export interface CategoryListType {
  categoryList: SpecificCategoryData[];
  isEditTitle: boolean[];
  newTitle: {
    [key: number]: string;
  };
  getAlgorithmList: () => Promise<void>;
  handleInputChange: (
    event: React.ChangeEvent<HTMLInputElement>,
    category: SpecificCategoryData
  ) => void;
  handleEditTitle: (categoryId: number) => void;
  handleInnerContextMenu: (
    event: React.MouseEvent<HTMLDivElement>,
    categoryId: number
  ) => void;
  getCategoryId: (id: number) => void;
  isToggleSelected: boolean[];
  handleToggle: (categoryId: number) => void;
  getCategory: (data: SpecificCategoryData) => void;
  setSpecificCategory: SetterOrUpdater<SpecificCategoryData>;
  CTid: number;
  handlePage: (page: PageKey, algorithmID?: number) => Promise<void>;
}
const CategoryList = ({
  categoryList,
  isEditTitle,
  newTitle,
  getAlgorithmList,
  handleInputChange,
  handleEditTitle,
  handleInnerContextMenu,
  getCategoryId,
  isToggleSelected,
  handleToggle,
  getCategory,
  setSpecificCategory,
  CTid,
  handlePage,
}: CategoryListType) => {
  return (
    <div className="category">
      {categoryList.map((category: SpecificCategoryData) => {
        return (
          <div
            className="categoryRow"
            key={category.categoryId}
            onClick={() => {
              getAlgorithmList();
            }}
          >
            {isEditTitle[category.categoryId] ? (
              <>
                <input
                  type="text"
                  value={newTitle[category.categoryId] || category.title}
                  onChange={(event) => handleInputChange(event, category)}
                  maxLength={8}
                />
                <button onClick={() => handleEditTitle(category.categoryId)}>
                  수정
                </button>
              </>
            ) : (
              <div style={{ width: "100%" }}>
                <div
                  // 나중에 선택 가시성 수정하기
                  className={`categoryTitle${isToggleSelected[category.categoryId] ? "selected" : ""}`}
                  onContextMenu={(event) =>
                    handleInnerContextMenu(event, category.categoryId)
                  }
                  onClick={() => {
                    console.log(category.categoryId);
                    getCategoryId(category.categoryId);
                  }}
                >
                  <span style={{ marginRight: "0.5rem" }}>
                    {category.title}
                  </span>

                  <div className="hr-line"></div>

                  <img
                    style={{ marginLeft: "0.5rem" }}
                    title={`${category.title}}`}
                    src={
                      isToggleSelected[category.categoryId]
                        ? CategoryExpansion
                        : CategoryExpansion2
                    }
                    onClick={() => {
                      handleToggle(category.categoryId);
                      if (!isToggleSelected[category.categoryId]) {
                        getCategory(category);
                      } else {
                        // 수정해야함
                        setSpecificCategory({
                          categoryId: 0,
                          subscribes: [],
                          title: "",
                        });
                      }
                    }}
                  />
                </div>
                <div
                  className="listColumn"
                  style={{ maxHeight: "200px", overflowY: "auto" }}
                >
                  {category.subscribes.length > 0 &&
                    category.subscribes.map((task, index: number) => {
                      if (CTid === category.categoryId) {
                        return (
                          <div key={index} className="algorithmProblems">
                            <li
                              style={{ padding: "0.3rem" }}
                              onClick={() =>
                                handlePage(
                                  "algorithmDescription",
                                  task.algorithm.algorithmId
                                )
                              }
                            >
                              {task.algorithm.algorithmTitle}
                            </li>
                          </div>
                        );
                      }
                    })}
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default CategoryList;
