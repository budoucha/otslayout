const rotBtnL = document.querySelector('.guide#guideL');
const rotBtnR = document.querySelector('.guide#guideR');

/* 背面パネルを非表示にする(正面パネルの邪魔にならないようにする) */
const hideIfBack = (element) => {
    const transform = element.computedStyleMap().get('transform');
    const rotate = Array.from(transform).find(transform => transform instanceof CSSRotate);
    const angle = rotate ? +rotate.angle.value : 0;

    if (angle === 180) {
        element.classList.add("hidden");
    }
    else {
        element.classList.remove("hidden");
    }
}

const panes = document.querySelectorAll('.pane');
panes.forEach((pane) => {
    hideIfBack(pane);
})


rotBtnL.addEventListener('click', () => {
    panes.forEach((pane) => {
        const transform = pane.computedStyleMap().get('transform');
        const rotate = Array.from(transform).find(transform => transform instanceof CSSRotate);
        const translate = Array.from(transform).find(transform => transform instanceof CSSTranslate);
        const currentAngle = rotate ? +rotate.angle.value : 0;
        const translateValue = translate ? `translateZ(${translate.z.value}${translate.z.unit})` : '';
        const newAngle = (Math.round(currentAngle / 90) - 1) * 90; //連打でずれていくのを防ぐため離散化する
        pane.style.transform = `rotateY(${newAngle}deg) ${translateValue}`;
        hideIfBack(pane);
    });
})

rotBtnR.addEventListener('click', () => {
    panes.forEach((pane) => {
        const transform = pane.computedStyleMap().get('transform');
        const rotate = Array.from(transform).find(transform => transform instanceof CSSRotate);
        const translate = Array.from(transform).find(transform => transform instanceof CSSTranslate);
        const currentAngle = rotate ? +rotate.angle.value : 0;
        const translateValue = translate ? `translateZ(${translate.z.value}${translate.z.unit})` : '';
        const newAngle = (Math.round(currentAngle / 90) + 1) * 90;
        pane.style.transform = `rotateY(${newAngle}deg) ${translateValue}`;
        hideIfBack(pane);
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
