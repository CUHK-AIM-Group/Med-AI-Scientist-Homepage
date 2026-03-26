(function () {
  function copyText(text, button) {
    navigator.clipboard.writeText(text).then(function () {
      var original = button.textContent;
      button.textContent = 'Copied';
      setTimeout(function () {
        button.textContent = original;
      }, 1400);
    });
  }

  var bibButton = document.getElementById('copyBib');
  var blurbButton = document.getElementById('copyBlurb');

  if (bibButton) {
    bibButton.addEventListener('click', function () {
      var bib = document.getElementById('bibtex').textContent.trim();
      copyText(bib, bibButton);
    });
  }

  if (blurbButton) {
    blurbButton.addEventListener('click', function () {
      var blurb = document.getElementById('prBlurb').textContent.trim();
      copyText(blurb, blurbButton);
    });
  }

  var resultTabs = Array.prototype.slice.call(
    document.querySelectorAll('.result-tab')
  );
  var resultPanels = Array.prototype.slice.call(
    document.querySelectorAll('.result-panel')
  );

  if (resultTabs.length > 0 && resultPanels.length > 0) {
    function setActiveResult(target) {
      resultTabs.forEach(function (tab) {
        var isActive = tab.getAttribute('data-result-target') === target;
        tab.classList.toggle('is-active', isActive);
        tab.setAttribute('aria-selected', String(isActive));
      });

      resultPanels.forEach(function (panel) {
        var isActive = panel.getAttribute('data-result-panel') === target;
        panel.classList.toggle('is-active', isActive);
        panel.hidden = !isActive;
      });
    }

    resultTabs.forEach(function (tab) {
      tab.addEventListener('click', function () {
        setActiveResult(tab.getAttribute('data-result-target'));
      });
    });
  }
})();

document.querySelectorAll('.result-tab').forEach(tab => {
  tab.addEventListener('click', () => {
    const target = tab.getAttribute('data-result-target');

    document.querySelectorAll('.result-tab').forEach(t => {
      t.classList.remove('is-active');
      t.setAttribute('aria-selected', 'false');
    });
    tab.classList.add('is-active');
    tab.setAttribute('aria-selected', 'true');

    document.querySelectorAll('.result-panel').forEach(panel => {
      if (panel.getAttribute('data-result-panel') === target) {
        panel.classList.add('is-active');
        panel.removeAttribute('hidden');
      } else {
        panel.classList.remove('is-active');
        panel.setAttribute('hidden', '');
      }
    });
  });
});

let currentSlideIndex = 0;

function changeImage(direction) {
  const slides = document.querySelectorAll('.carousel-slide');
  
  slides[currentSlideIndex].classList.remove('active');
  
  currentSlideIndex = (currentSlideIndex + direction + slides.length) % slides.length;
  
  slides[currentSlideIndex].classList.add('active');
}

document.addEventListener("DOMContentLoaded", function() {
  var evidenceTabs = Array.prototype.slice.call(document.querySelectorAll('.evidence-tab'));
  var evidencePanels = Array.prototype.slice.call(document.querySelectorAll('.evidence-panel'));

  if (evidenceTabs.length > 0 && evidencePanels.length > 0) {
    evidenceTabs.forEach(function (tab) {
      tab.addEventListener('click', function () {
        var target = tab.getAttribute('data-evidence-target');
        
        evidenceTabs.forEach(function (t) {
          var isActive = t.getAttribute('data-evidence-target') === target;
          t.classList.toggle('is-active', isActive);
          t.setAttribute('aria-selected', String(isActive));
        });

        evidencePanels.forEach(function (p) {
          var isActive = p.getAttribute('data-evidence-panel') === target;
          p.classList.toggle('is-active', isActive);
          p.hidden = !isActive;
        });
      });
    });
  }
});