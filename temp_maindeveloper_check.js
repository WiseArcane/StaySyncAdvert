
    (function () {
      function initPortfolioInteractions() {
        var timeDisplay = document.getElementById("time-display");
        var focusDisplay = document.getElementById("focus-display");
        var chips = document.querySelectorAll(".chip");
        var cards = document.querySelectorAll("[data-card]");
        var scheduleToggle = document.getElementById("schedule-toggle");
        var scheduleTable = document.getElementById("schedule-table");

        if (!timeDisplay || !focusDisplay || !chips.length || !cards.length || !scheduleToggle || !scheduleTable) {
          return;
        }

        var focusLabels = {
          all: "Software Development",
          about: "Personal Profile",
          subjects: "Major Subjects",
          hobbies: "Creative Routine",
          schedule: "Academic Schedule"
        };

        function updateTime() {
          var now = new Date();
          timeDisplay.textContent = now.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit"
          });
        }

        function setFocus(target) {
          var i;
          focusDisplay.textContent = focusLabels[target] || focusLabels.all;

          for (i = 0; i < chips.length; i += 1) {
            chips[i].classList.toggle("is-active", chips[i].getAttribute("data-focus") === target);
          }

          for (i = 0; i < cards.length; i += 1) {
            var cardTarget = cards[i].getAttribute("data-card");
            var matches = target === "all" || cardTarget === target;
            cards[i].classList.toggle("is-highlighted", matches);
            cards[i].classList.toggle("is-dimmed", !matches && target !== "all");
          }
        }

        function handleChipClick(event) {
          var target = event.currentTarget.getAttribute("data-focus");
          setFocus(target);
        }

        function toggleSchedule() {
          var isCollapsed = scheduleTable.classList.toggle("is-collapsed");
          scheduleToggle.textContent = isCollapsed ? "Show Schedule" : "Hide Schedule";
          scheduleToggle.setAttribute("aria-expanded", String(!isCollapsed));
        }

        for (var i = 0; i < chips.length; i += 1) {
          chips[i].addEventListener("click", handleChipClick);
        }

        scheduleToggle.addEventListener("click", toggleSchedule);

        updateTime();
        window.setInterval(updateTime, 1000);
        setFocus("all");
      }

      if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", initPortfolioInteractions);
      } else {
        initPortfolioInteractions();
      }
    }());
  
