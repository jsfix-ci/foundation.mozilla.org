import { Utils } from "./utils.js";

const categoryTitle = document.querySelector(`.category-title`);
const parentTitle = document.querySelector(`.parent-title`);
const subcategories = document.querySelectorAll(`.subcategories`);

/**
 * ...
 * @param {*} instance
 */
export function setupNavLinks(instance) {
  const navLinks = document.querySelectorAll(
    `#multipage-nav a,.category-header,#pni-nav-mobile a`
  );

  for (const nav of navLinks) {
    nav.addEventListener("click", (evt) => {
      evt.stopPropagation();

      if (evt.shiftKey || evt.metaKey || evt.ctrlKey || evt.altKey) {
        return;
      }

      evt.preventDefault();

      document
        .querySelector(`#multipage-nav a.active`)
        .classList.remove(`active`);

      document
        .querySelector(`#pni-nav-mobile a.active`)
        .classList.remove(`active`);

      document
        .querySelector("#pni-nav-mobile .dropdown-nav")
        .classList.remove("dropdown-nav-open");

      const { name: categoryName } = evt.target.dataset ?? {};

      if (categoryName) {
        document
          .querySelector(`#multipage-nav a[data-name="${categoryName}"]`)
          .classList.add(`active`);

        document
          .querySelector(`#pni-nav-mobile a[data-name="${categoryName}"]`)
          .classList.add(`active`);

        instance.clearText();
        history.pushState(
          {
            title: Utils.getTitle(categoryName),
            category: categoryName,
            parent: "",
            search: "",
            filter: history.state?.filter,
          },
          Utils.getTitle(categoryName),
          evt.target.href
        );

        document.title = Utils.getTitle(categoryName);
        instance.filterSubcategory(categoryName);
        instance.toggleSubcategory(true);
        Utils.updateHeader(categoryName, "");
        instance.filterCategory(categoryName);
      }
    });
  }

  for (const subcategory of subcategories) {
    subcategory.addEventListener(
      "click",
      (evt) => {
        evt.stopImmediatePropagation();
        if (evt.shiftKey || evt.metaKey || evt.ctrlKey || evt.altKey) {
          return;
        }

        evt.preventDefault();

        let href;

        const { name: subcategoryName } = evt.target.dataset;

        if (subcategoryName) {
          instance.clearText();
          if (categoryTitle.value.trim() !== subcategoryName) {
            categoryTitle.value = subcategoryName;
            parentTitle.value = evt.target.dataset.parent;
            href = evt.target.href;
            instance.toggleSubcategory();
            Utils.highlightParentCategory();
          } else {
            categoryTitle.value = evt.target.dataset.parent;
            parentTitle.value = "";
            href = document.querySelector(
              `#multipage-nav a[data-name="${evt.target.dataset.parent}"]`
            ).href;
            instance.toggleSubcategory(true);
          }

          history.pushState(
            {
              title: Utils.getTitle(subcategoryName),
              category: categoryTitle.value.trim(),
              parent: parentTitle.value.trim(),
              search: "",
              filter: history.state?.filter,
            },
            Utils.getTitle(subcategoryName),
            href
          );

          document.title = Utils.getTitle(categoryTitle.value.trim());
          Utils.updateHeader(
            categoryTitle.value.trim(),
            parentTitle.value.trim()
          );
          instance.filterCategory(categoryTitle.value.trim());
        }
      },
      true
    );
  }
}

/**
 * ...
 * @param {*} instance
 */
export function setupGoBackToAll(instance) {
  document
    .querySelector(`.go-back-to-all-link`)
    .addEventListener("click", (evt) => {
      evt.stopPropagation();

      if (evt.shiftKey || evt.metaKey || evt.ctrlKey || evt.altKey) {
        return;
      }

      evt.preventDefault();

      instance.clearText();
      history.pushState(
        {
          title: Utils.getTitle("None"),
          category: "None",
          parent: "",
          search: "",
          filter: history.state?.filter,
        },
        Utils.getTitle(evt.target.dataset.name),
        evt.target.href
      );

      document
        .querySelector(`#multipage-nav a.active`)
        .classList.remove(`active`);

      document
        .querySelector(`#pni-nav-mobile a.active`)
        .classList.remove(`active`);

      document
        .querySelector(`#multipage-nav a[data-name="None"]`)
        .classList.add(`active`);

      document
        .querySelector(`#pni-nav-mobile a[data-name="None"]`)
        .classList.add(`active`);

      instance.filterCategory("None");
      parentTitle.value = "";
    });
}