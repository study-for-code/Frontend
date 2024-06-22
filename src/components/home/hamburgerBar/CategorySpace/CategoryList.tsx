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
  handlePage: (
    page: PageKey,
    algorithmID?: number,
    subscribeID?: number
  ) => Promise<void>;
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
            <div>
              {isEditTitle[category.categoryId] ? (
                <div className="editAreaCG">
                  <input
                    className="editInputCG"
                    type="text"
                    defaultValue={
                      newTitle[category.categoryId] || category.title
                    }
                    onChange={(event) => handleInputChange(event, category)}
                    maxLength={10}
                  />
                  <button
                    className="editBtnCG"
                    onClick={() => handleEditTitle(category.categoryId)}
                  >
                    Save
                  </button>
                </div>
              ) : (
                <div
                  // 나중에 선택 가시성 수정하기
                  className={`categoryTitle${isToggleSelected[category.categoryId] ? " selected" : ""}`}
                  onContextMenu={(event) =>
                    handleInnerContextMenu(event, category.categoryId)
                  }
                  onClick={() => {
                    console.log("category Id: ", category.categoryId);
                    getCategoryId(category.categoryId);

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
                  />
                </div>
              )}
              <div
                className="listColumn"
                style={{ maxHeight: "200px", overflowY: "auto" }}
              >
                {category.subscribes.length > 0 &&
                  isToggleSelected[category.categoryId] &&
                  category.subscribes.map((task, index: number) => {
                    // if (CTid === category.categoryId) {
                    return (
                      <div key={index} className="algorithmProblems">
                        <li
                          style={{ padding: "0.3rem" }}
                          onClick={() =>
                            handlePage(
                              "algorithmDescription",
                              task.algorithm.algorithmId,
                              task.subscribeId
                            )
                          }
                        >
                          {task.algorithm.algorithmTitle}
                        </li>
                      </div>
                    );
                  })}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default CategoryList;
