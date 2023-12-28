const rotBtnL = document.querySelector('.guide#guideL');
const rotBtnR = document.querySelector('.guide#guideR');

rotBtnL.addEventListener('click', () => {
    const panes = document.querySelectorAll('.pane');
    panes.forEach((pane) => {
        const transform = pane.computedStyleMap().get('transform');
        const rotate = Array.from(transform).find(transform => transform instanceof CSSRotate);
        const translate = Array.from(transform).find(transform => transform instanceof CSSTranslate);
        const currentAngle = rotate ? +rotate.angle.value : 0;
        const translateValue = translate ? `translateZ(${translate.z.value}${translate.z.unit})` : '';
        const newAngle = currentAngle - 90;
        pane.style.transform = `rotateY(${newAngle}deg) ${translateValue}`;
    });
})

rotBtnR.addEventListener('click', () => {
    const panes = document.querySelectorAll('.pane');
    panes.forEach((pane) => {
        const transform = pane.computedStyleMap().get('transform');
        const rotate = Array.from(transform).find(transform => transform instanceof CSSRotate);
        const translate = Array.from(transform).find(transform => transform instanceof CSSTranslate);
        const currentAngle = rotate ? +rotate.angle.value : 0;
        const translateValue = translate ? `translateZ(${translate.z.value}${translate.z.unit})` : '';
        const newAngle = currentAngle + 90;
        pane.style.transform = `rotateY(${newAngle}deg) ${translateValue}`;
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