// GameSite JS-Driven Theme Loader

(function() {
  // Define color palettes for each theme
  const themes = {
    dark: {
      bgPrimary: "#121212",
      bgSecondary: "#1e1e1e",
      textPrimary: "#ffffff",
      textSecondary: "#b0b0b0",
      accent: "#6c63ff",    // Changed to a deeper purple
      navActive: "#6c63ff", 
      navActiveText: "#121212",
      h1Gradient: "linear-gradient(90deg, #6c63ff, #8E64FF)",
    },
    light: {
      bgPrimary: "#f5f5f5",
      bgSecondary: "#ffffff",
      textPrimary: "#222222",
      textSecondary: "#555555",
      accent: "#4a90e2",    // Changed to a sky blue
      navActive: "#4a90e2",
      navActiveText: "#fff",
      h1Gradient: "linear-gradient(90deg, #4a90e2, #83b8ff)",
    },
    pink: {
      bgPrimary: "#fff0f7",
      bgSecondary: "#ffdbee",
      textPrimary: "#d81b60",
      textSecondary: "#ec407a",
      accent: "#ff4d8c",    // More vibrant pink
      navActive: "#ff4d8c",
      navActiveText: "#fff",
      h1Gradient: "linear-gradient(90deg, #ff4d8c, #ff85a2)",
    },
    solarized: {
      bgPrimary: "#fdf6e3",    // Classic solarized light background
      bgSecondary: "#eee8d5",
      textPrimary: "#586e75",  // Proper solarized text color
      textSecondary: "#93a1a1",
      accent: "#2aa198",       // Authentic solarized cyan
      navActive: "#2aa198",
      navActiveText: "#fdf6e3",
      h1Gradient: "linear-gradient(90deg, #2aa198, #268bd2)",  // Cyan to blue
    },
    blue: {
      bgPrimary: "#e3f2fd",
      bgSecondary: "#bbdefb",
      textPrimary: "#0d47a1",
      textSecondary: "#1976d2",
      accent: "#2196f3",       // True blue
      navActive: "#2196f3",
      navActiveText: "#fff",
      h1Gradient: "linear-gradient(90deg, #2196f3, #64b5f6)",
    },
    midnight: {
      bgPrimary: "#0f1123",    // Deeper blue/black
      bgSecondary: "#1a1f3c",
      textPrimary: "#e0e0ff",
      textSecondary: "#a0a0cc",
      accent: "#3d5afe",       // Vibrant blue
      navActive: "#3d5afe",
      navActiveText: "#fff",
      h1Gradient: "linear-gradient(90deg, #3d5afe, #536dfe)",
    },
    forest: {
      bgPrimary: "#1b2a1b",    // Darker forest green
      bgSecondary: "#2d462d",
      textPrimary: "#d3e8d3",
      textSecondary: "#93c893",
      accent: "#2e7d32",       // Rich forest green
      navActive: "#2e7d32",
      navActiveText: "#fff",
      h1Gradient: "linear-gradient(90deg, #2e7d32, #4caf50)",
    },
    ocean: {
      bgPrimary: "#0a3944",    // Deeper ocean blue
      bgSecondary: "#14616f",
      textPrimary: "#e0f7fa",
      textSecondary: "#80deea",
      accent: "#00acc1",       // Ocean blue/teal
      navActive: "#00acc1",
      navActiveText: "#fff",
      h1Gradient: "linear-gradient(90deg, #00acc1, #006064)",
    },
    peach: {
      bgPrimary: "#fff3e0",    // Soft peach background
      bgSecondary: "#ffe0b2",
      textPrimary: "#e65100",  // Peach text
      textSecondary: "#fb8c00",
      accent: "#ffab40",       // Peachy orange
      navActive: "#ffab40",
      navActiveText: "#fff",
      h1Gradient: "linear-gradient(90deg, #ffab40, #ff9100)",
    },
    lavender: {
      bgPrimary: "#f3e5f5",    // Light lavender
      bgSecondary: "#e1bee7",
      textPrimary: "#6a1b9a",  // Deep purple
      textSecondary: "#9c27b0",
      accent: "#ab47bc",       // Rich lavender
      navActive: "#ab47bc",
      navActiveText: "#fff",
      h1Gradient: "linear-gradient(90deg, #ab47bc, #ce93d8)",
    },
    emerald: {
      bgPrimary: "#e8f5e9",    // Light mint
      bgSecondary: "#c8e6c9",
      textPrimary: "#1b5e20",  // Deep emerald
      textSecondary: "#4caf50",
      accent: "#00c853",       // True emerald
      navActive: "#00c853",
      navActiveText: "#fff",
      h1Gradient: "linear-gradient(90deg, #00c853, #69f0ae)",
    },
    sunset: {
      bgPrimary: "#ffebee",
      bgSecondary: "#ffcdd2",
      textPrimary: "#bf360c",    // Deep sunset orange
      textSecondary: "#f4511e",
      accent: "#ff6d00",         // Vibrant sunset orange
      navActive: "#ff6d00",
      navActiveText: "#fff",
      h1Gradient: "linear-gradient(90deg, #ff6d00, #ff3d00)",
    },
    sky: {
      bgPrimary: "#e1f5fe",    // Light sky blue
      bgSecondary: "#b3e5fc",
      textPrimary: "#01579b",  // Deep sky blue
      textSecondary: "#039be5",
      accent: "#40c4ff",       // Bright sky blue
      navActive: "#40c4ff",
      navActiveText: "#fff",
      h1Gradient: "linear-gradient(90deg, #40c4ff, #00b0ff)",
    },
    mint: {
      bgPrimary: "#e0f2f1",    // Minty background
      bgSecondary: "#b2dfdb",
      textPrimary: "#004d40",  // Deep mint green
      textSecondary: "#00897b",
      accent: "#1de9b6",       // Bright mint
      navActive: "#1de9b6",
      navActiveText: "#004d40",
      h1Gradient: "linear-gradient(90deg, #1de9b6, #64ffda)",
    },
    sand: {
      bgPrimary: "#fcf8e3",    // Sandy beige
      bgSecondary: "#f5edd2",
      textPrimary: "#8d6e63",  // Sand brown
      textSecondary: "#a1887f",
      accent: "#d0a77b",       // Sandy gold
      navActive: "#d0a77b",
      navActiveText: "#fff",
      h1Gradient: "linear-gradient(90deg, #d0a77b, #e6c195)",
    },
    coffee: {
      bgPrimary: "#3e2723",    // Dark coffee brown
      bgSecondary: "#54332c",
      textPrimary: "#efebe9",
      textSecondary: "#bcaaa4",
      accent: "#a1887f",       // Medium coffee
      navActive: "#a1887f",
      navActiveText: "#fff",
      h1Gradient: "linear-gradient(90deg, #a1887f, #6d4c41)",
    },
    candy: {
      bgPrimary: "#fce4ec",    // Light candy pink
      bgSecondary: "#f8bbd0",
      textPrimary: "#c2185b",  // Deep candy pink
      textSecondary: "#ec407a",
      accent: "#ff4081",       // Vibrant candy
      navActive: "#ff4081",
      navActiveText: "#fff",
      h1Gradient: "linear-gradient(90deg, #ff4081, #f50057)",
    },
    grape: {
      bgPrimary: "#f3e5f5",    // Light grape
      bgSecondary: "#e1bee7",
      textPrimary: "#6a1b9a",  // Deep grape purple
      textSecondary: "#8e24aa",
      accent: "#aa00ff",       // Rich grape
      navActive: "#aa00ff",
      navActiveText: "#fff",
      h1Gradient: "linear-gradient(90deg, #aa00ff, #d500f9)",
    },
    retro: {
      bgPrimary: "#fff8e1",    // Vintage cream
      bgSecondary: "#ffecb3",
      textPrimary: "#ff6f00",  // Retro orange
      textSecondary: "#ffa000",
      accent: "#ffab00",       // Retro gold
      navActive: "#ffab00",
      navActiveText: "#fff",
      h1Gradient: "linear-gradient(90deg, #ffab00, #ff6d00)",
    },
    blossom: {
      bgPrimary: "#fce4ec",    // Cherry blossom pink
      bgSecondary: "#f8bbd0",
      textPrimary: "#ad1457",  // Deep pink
      textSecondary: "#ec407a",
      accent: "#ff80ab",       // Soft blossom
      navActive: "#ff80ab",
      navActiveText: "#fff",
      h1Gradient: "linear-gradient(90deg, #ff80ab, #ff4081)",
    },
    lemon: {
      bgPrimary: "#fffde7",    // Pale lemon
      bgSecondary: "#fff9c4",
      textPrimary: "#f9a825",  // Lemon yellow
      textSecondary: "#fbc02d",
      accent: "#ffea00",       // Bright lemon
      navActive: "#ffea00",
      navActiveText: "#f57f17",
      h1Gradient: "linear-gradient(90deg, #ffea00, #ffd600)",
    },
    slate: {
      bgPrimary: "#263238",    // Deep slate
      bgSecondary: "#37474f",
      textPrimary: "#eceff1",
      textSecondary: "#b0bec5",
      accent: "#607d8b",       // True slate
      navActive: "#607d8b",
      navActiveText: "#fff",
      h1Gradient: "linear-gradient(90deg, #607d8b, #455a64)",
    },
    moss: {
      bgPrimary: "#2c3e2d",    // Deep moss green
      bgSecondary: "#3e5641",
      textPrimary: "#e8f5e9",
      textSecondary: "#a5d6a7",
      accent: "#81c784",       // Moss green
      navActive: "#81c784",
      navActiveText: "#2c3e2d",
      h1Gradient: "linear-gradient(90deg, #81c784, #2c3e2d)",
    },
    velvet: {
      bgPrimary: "#311b92",    // Deep velvet purple
      bgSecondary: "#4527a0",
      textPrimary: "#f3e5f5",
      textSecondary: "#d1c4e9",
      accent: "#9575cd",       // Soft velvet
      navActive: "#9575cd",
      navActiveText: "#fff",
      h1Gradient: "linear-gradient(90deg, #9575cd, #673ab7)",
    },
    papaya: {
      bgPrimary: "#ffeeca",    // Light papaya
      bgSecondary: "#ffdb96",
      textPrimary: "#fb8c00",  // Papaya orange
      textSecondary: "#ff9800",
      accent: "#ffb74d",       // Papaya skin
      navActive: "#ffb74d",    
      navActiveText: "#e65100",
      h1Gradient: "linear-gradient(90deg, #ffb74d, #fb8c00)",
    },
    noir: {
      bgPrimary: "#0a0a0a",    // Nearly black
      bgSecondary: "#1a1a1a",
      textPrimary: "#f5f5f5",
      textSecondary: "#9e9e9e",
      accent: "#5c5c5c",       // Dark grey
      navActive: "#5c5c5c",
      navActiveText: "#fff",
      h1Gradient: "linear-gradient(90deg, #5c5c5c, #212121)",
    },
    arctic: {
      bgPrimary: "#e1f5fe",    // Ice blue
      bgSecondary: "#b3e5fc",
      textPrimary: "#0288d1",  // Arctic blue
      textSecondary: "#29b6f6",
      accent: "#4fc3f7",       // Light arctic blue
      navActive: "#4fc3f7",
      navActiveText: "#01579b",
      h1Gradient: "linear-gradient(90deg, #4fc3f7, #03a9f4)",
    },
    blossomNight: {
      bgPrimary: "#33022e",    // Deep night purple
      bgSecondary: "#4a0940",
      textPrimary: "#fce4ec",
      textSecondary: "#f48fb1",
      accent: "#ec407a",       // Night blossom pink
      navActive: "#ec407a",
      navActiveText: "#fff",
      h1Gradient: "linear-gradient(90deg, #ec407a, #ad1457)",
    },
    clay: {
      bgPrimary: "#efebe9",    // Light clay
      bgSecondary: "#d7ccc8",
      textPrimary: "#5d4037",  // Clay brown
      textSecondary: "#8d6e63",
      accent: "#a1887f",       // Medium clay
      navActive: "#a1887f",
      navActiveText: "#fff",
      h1Gradient: "linear-gradient(90deg, #a1887f, #795548)",
    },
    denim: {
      bgPrimary: "#e8eaf6",    // Light denim
      bgSecondary: "#c5cae9",
      textPrimary: "#283593",  // Deep denim blue
      textSecondary: "#3949ab",
      accent: "#3f51b5",       // True denim
      navActive: "#3f51b5",
      navActiveText: "#fff",
      h1Gradient: "linear-gradient(90deg, #3f51b5, #5c6bc0)",
    },
    flamingo: {
      bgPrimary: "#ffebee",    // Light flamingo pink
      bgSecondary: "#ffcdd2",
      textPrimary: "#e53935",  // Flamingo red/pink
      textSecondary: "#ef5350",
      accent: "#ff80ab",       // Flamingo pink
      navActive: "#ff80ab",
      navActiveText: "#c2185b",
      h1Gradient: "linear-gradient(90deg, #ff80ab, #ff4081)",
    },
    aqua: {
      bgPrimary: "#e0f7fa",    // Light aqua
      bgSecondary: "#b2ebf2",
      textPrimary: "#006064",  // Deep aqua
      textSecondary: "#0097a7",
      accent: "#00bcd4",       // True aqua
      navActive: "#00bcd4",
      navActiveText: "#fff",
      h1Gradient: "linear-gradient(90deg, #00bcd4, #26c6da)",
    },
    cream: {
      bgPrimary: "#fffbf0",    // Cream
      bgSecondary: "#fff3e0",
      textPrimary: "#bf8a5c",  // Cream brown
      textSecondary: "#d2b48c",
      accent: "#e6cba5",       // Light cream
      navActive: "#e6cba5",
      navActiveText: "#a58268",
      h1Gradient: "linear-gradient(90deg, #e6cba5, #d2b48c)",
    },
    raspberry: {
      bgPrimary: "#fce4ec",    // Light raspberry
      bgSecondary: "#f8bbd0",
      textPrimary: "#880e4f",  // Deep raspberry
      textSecondary: "#c2185b",
      accent: "#e91e63",       // True raspberry
      navActive: "#e91e63",
      navActiveText: "#fff",
      h1Gradient: "linear-gradient(90deg, #e91e63, #d81b60)",
    },
    cyprus: {
      bgPrimary: "#22223b",    // Dark cyprus blue
      bgSecondary: "#4a4e69",
      textPrimary: "#f2e9e4",
      textSecondary: "#c9ada7",
      accent: "#9a8c98",       // Cyprus accent
      navActive: "#9a8c98",
      navActiveText: "#22223b",
      h1Gradient: "linear-gradient(90deg, #9a8c98, #4a4e69)",
    },
    mono: {
      bgPrimary: "#fafafa",    // Off-white
      bgSecondary: "#f5f5f5",
      textPrimary: "#212121",  // Nearly black
      textSecondary: "#757575",
      accent: "#424242",       // Dark gray
      navActive: "#424242",
      navActiveText: "#fff",
      h1Gradient: "linear-gradient(90deg, #424242, #757575)",
    },
    jellybean: {
      bgPrimary: "#e8f5e9",    // Light green
      bgSecondary: "#c8e6c9",
      textPrimary: "#2e7d32",  // Jellybean green
      textSecondary: "#43a047",
      accent: "#66bb6a",       // Medium green
      navActive: "#66bb6a",
      navActiveText: "#fff",
      h1Gradient: "linear-gradient(90deg, #66bb6a, #43a047)",
    },
  };

  function applyTheme(themeName) {
    const theme = themes[themeName] || themes.dark;
    document.body.style.backgroundColor = theme.bgPrimary;
    document.body.style.color = theme.textPrimary;

    // Header & .centerpiece backgrounds
    document.querySelectorAll('header, .centerpiece').forEach(el => {
      el.style.background = theme.bgSecondary;
      el.style.color = theme.textPrimary;
    });

    // Nav links
    document.querySelectorAll('nav a').forEach(a => {
      a.style.color = theme.textPrimary;
      a.style.background = "none";
    });
    // Active nav link
    document.querySelectorAll('nav a.active, nav a:hover').forEach(a => {
      a.style.background = theme.navActive;
      a.style.color = theme.navActiveText;
    });

    // Gradient h1
    document.querySelectorAll('.centerpiece h1').forEach(h1 => {
      h1.style.background = theme.h1Gradient;
      h1.style.webkitBackgroundClip = "text";
      h1.style.backgroundClip = "text";
      h1.style.color = "transparent";
    });

    // Accent color for .logo, .settings-card h2, .setting-group h3, .reset-button
    document.querySelectorAll('.logo, .settings-card h2, .setting-group h3, .reset-button').forEach(el => {
      el.style.color = theme.accent;
    });

    // Reset accent for nav a (so .logo stays correct)
    document.querySelectorAll('nav a:not(.active)').forEach(a => {
      a.style.color = theme.textPrimary;
    });

    // Subtexts
    document.querySelectorAll('.subtext').forEach(el => {
      el.style.color = theme.textSecondary;
    });
  }

  function handleThemeChange() {
    const theme = localStorage.getItem('theme') || 'dark';
    applyTheme(theme);
  }

  function init() {
    handleThemeChange();

    // Listen for theme changes from other tabs
    window.addEventListener('storage', function(e) {
      if (e.key === 'theme') handleThemeChange();
    });

    // Listen for custom themechange event (for same-tab updates)
    window.addEventListener('themechange', handleThemeChange);

    // Panic logic (unchanged)
    let panicActive = false;
    let panicOverlay = null;
    function showPanicImage(url) {
      if (!url) return;
      if (!panicOverlay) {
        panicOverlay = document.createElement('div');
        panicOverlay.style.position = 'fixed';
        panicOverlay.style.top = 0;
        panicOverlay.style.left = 0;
        panicOverlay.style.width = '100vw';
        panicOverlay.style.height = '100vh';
        panicOverlay.style.zIndex = 99999;
        panicOverlay.style.background = `center/contain no-repeat #111 url('${url}')`;
        panicOverlay.style.transition = 'opacity 0.2s';
        document.body.appendChild(panicOverlay);
      } else {
        panicOverlay.style.background = `center/contain no-repeat #111 url('${url}')`;
        panicOverlay.style.display = 'block';
      }
      panicOverlay.style.opacity = '1';
      panicActive = true;
    }
    function hidePanicImage() {
      if (panicOverlay) {
        panicOverlay.style.opacity = '0';
        setTimeout(() => {
          if (panicOverlay) panicOverlay.style.display = 'none';
        }, 200);
      }
      panicActive = false;
    }
    // Panic image and keys
    const panicSettings = {
      image: '',
      key: '',
      exitKey: ''
    };
    function loadPanicSettings() {
      panicSettings.image = localStorage.getItem('gamesite_panic_image') || '';
      panicSettings.key = (localStorage.getItem('gamesite_panic_key') || '').toLowerCase();
      panicSettings.exitKey = (localStorage.getItem('gamesite_panic_exit_key') || '').toLowerCase();
    }
    loadPanicSettings();
    window.addEventListener('storage', function(e) {
      if (['gamesite_panic_image', 'gamesite_panic_key', 'gamesite_panic_exit_key'].includes(e.key)) {
        loadPanicSettings();
      }
    });
    window.addEventListener('keydown', function(e) {
      if (document.activeElement && ['INPUT', 'TEXTAREA'].includes(document.activeElement.tagName)) return;
      // Show panic
      if (!panicActive && panicSettings.key && e.key.toLowerCase() === panicSettings.key && panicSettings.image) {
        showPanicImage(panicSettings.image);
      }
      // Hide panic
      if (panicActive && panicSettings.exitKey && e.key.toLowerCase() === panicSettings.exitKey) {
        hidePanicImage();
      }
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();