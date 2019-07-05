import posed from 'react-pose';

const AccordionItem = posed.div({
  closed: { height: 0, opacity: 0 },
  open: {
    height: 'auto',
    opacity: 100,
    transition: {
      ease: 'easeInOut',
      duration: 150
    }
  }
});

export default AccordionItem;
