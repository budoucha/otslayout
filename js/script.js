const rotBtnL = document.querySelector('.guide#guideL');
const rotBtnR = document.querySelector('.guide#guideR');

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
    const { angleValue, translateValue} = getAngleAndTranslate(pane);
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
