document.addEventListener("DOMContentLoaded", () => {
  // 1. 首頁分類篩選與關鍵字搜尋功能
  const filterButtons = document.querySelectorAll(".filter-btn");
  const searchInput = document.getElementById("search-input");
  const noteCards = document.querySelectorAll(".note-card");
  const emptyState = document.getElementById("empty-state");

  if (filterButtons.length > 0 && noteCards.length > 0) {
    let activeCategory = "all";
    let searchKeyword = "";

    const updateVisibleCards = () => {
      let visibleCount = 0;

      noteCards.forEach((card) => {
        const cardCategory = card.getAttribute("data-category") || "";
        const cardText = card.textContent.toLowerCase();

        const matchesCategory =
          activeCategory === "all" || cardCategory === activeCategory;
        const matchesKeyword = cardText.includes(searchKeyword);

        if (matchesCategory && matchesKeyword) {
          card.style.display = "flex";
          visibleCount++;
        } else {
          card.style.display = "none";
        }
      });

      if (emptyState) {
        emptyState.style.display = visibleCount === 0 ? "block" : "none";
      }
    };

    filterButtons.forEach((btn) => {
      btn.addEventListener("click", () => {
        filterButtons.forEach((b) => b.classList.remove("active"));
        btn.classList.add("active");
        activeCategory = btn.getAttribute("data-filter") || "all";
        updateVisibleCards();
      });
    });

    if (searchInput) {
      searchInput.addEventListener("input", (e) => {
        searchKeyword = e.target.value.trim().toLowerCase();
        updateVisibleCards();
      });
    }
  }

  // 2. 筆記頁面程式碼一鍵複製功能
  const copyButtons = document.querySelectorAll(".copy-btn");

  copyButtons.forEach((button) => {
    button.addEventListener("click", async () => {
      const codeBlock = button.closest(".code-block");
      const codeElement = codeBlock ? codeBlock.querySelector("code") : null;
      if (!codeElement) return;

      const textToCopy = codeElement.innerText;

      try {
        await navigator.clipboard.writeText(textToCopy);
        showCopiedFeedback(button);
      } catch (err) {
        // 相容於本機 file:// 開啟時的備援複製方式
        const textarea = document.createElement("textarea");
        textarea.value = textToCopy;
        textarea.style.position = "fixed";
        textarea.style.opacity = "0";
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand("copy");
        document.body.removeChild(textarea);
        showCopiedFeedback(button);
      }
    });
  });

  function showCopiedFeedback(button) {
    const originalText = button.textContent;
    button.textContent = "已複製！";
    button.disabled = true;
    setTimeout(() => {
      button.textContent = originalText;
      button.disabled = false;
    }, 1800);
  }
});