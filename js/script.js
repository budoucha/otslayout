const otsLayout = () => {
    const otsRootElement = document.querySelector('div.otslayout>.content');
    let disabled = true;
    otsRootElement.classList.add('disabled');

    // enable/disable by s key
    document.addEventListener('keydown', (e) => {
        if (e.key === 's') {
            disabled = !disabled;
            otsRootElement.classList.toggle('disabled', disabled);
        }
    });
    // or with a button
    const mainSwitchElement = document.querySelector('div.otslayout>.main-switch');
    mainSwitchElement.addEventListener('click', () => {
        disabled = !disabled;
        otsRootElement.classList.toggle('disabled', disabled);
    });

    const rotBtnL = otsRootElement.querySelector('.guide#guideL');
    const rotBtnR = otsRootElement.querySelector('.guide#guideR');

    const getAngleAndTranslate = (pane) => {
        const transform = pane.computedStyleMap().get('transform');
        const rotate = Array.from(transform).find(transform => transform instanceof CSSRotate);
        const translate = Array.from(transform).find(transform => transform instanceof CSSTranslate);
        const angleValue = rotate ? +rotate.angle.value : 0;
        const translateValue = translate ? `translateZ(${translate.z.value}${translate.z.unit})` : '';
        return { angleValue, translateValue };
    }

    const movePane = (pane, angle, translateValue) => {
        pane.style.transform = `rotateY(${angle}deg) ${translateValue}`;
        if (angle % 360 === 180) {
            pane.classList.add("back");
        }
        else {
            pane.classList.remove("back");
        }
    }

    const panes = document.querySelectorAll('.pane');

    /* 背面パネルを非表示にする(正面パネルの邪魔にならないようにする) */
    panes.forEach((pane) => {
        const { angleValue, translateValue } = getAngleAndTranslate(pane);
        movePane(pane, angleValue, translateValue);
    })

    rotBtnL.addEventListener('click', () => {
        panes.forEach((pane) => {
            const { angleValue, translateValue } = getAngleAndTranslate(pane);
            const newAngle = ((Math.round(angleValue / 90) - 1) * 90); //連打でずれていくのを防ぐため離散化する
            movePane(pane, newAngle, translateValue);
        });
    })

    rotBtnR.addEventListener('click', () => {
        panes.forEach((pane) => {
            const { angleValue, translateValue } = getAngleAndTranslate(pane);
            const newAngle = ((Math.round(angleValue / 90) + 1) * 90);
            movePane(pane, newAngle, translateValue);
        });
    })

    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') {
            rotBtnL.click();
        }
        if (e.key === 'ArrowRight') {
            rotBtnR.click();
        }
    })

    // Add swipe event listeners for left and right flicks
    let startX = 0;
    let endX = 0;

    document.addEventListener('touchstart', (e) => {
        startX = e.touches[0].clientX;
    });

    document.addEventListener('touchend', (e) => {
        endX = e.changedTouches[0].clientX;
        const screenWidth = window.innerWidth;
        const swipeLength = Math.abs(endX - startX);
        const minSwipeLength = screenWidth * 0.3; // Minimum swipe length required for the flick

        if (swipeLength >= minSwipeLength) {
            if (endX < startX) {
                rotBtnR.click(); // Right flick
            } else {
                rotBtnL.click(); // Left flick
            }
        }
    });
}

otsLayout();
