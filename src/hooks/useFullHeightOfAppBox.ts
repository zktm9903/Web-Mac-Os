import { useEffect, useState } from 'react';

const useFullHeightOfAppBox = () => {
  const [fullHeightOfAppBox, setFullHeightOfAppBox] = useState(900);

  useEffect(() => {
    function getFullHeightOfAppBox() {
      const dock = document.getElementById('dock');
      const topbar = document.getElementById('topbar');

      if (!dock || !topbar) return;
      setFullHeightOfAppBox(dock?.offsetTop - topbar?.offsetHeight);
    }
    getFullHeightOfAppBox();
    window.addEventListener('resize', getFullHeightOfAppBox);

    return () => {
      window.removeEventListener('resize', getFullHeightOfAppBox);
    };
  }, []);

  return { fullHeightOfAppBox };
};

export default useFullHeightOfAppBox;
