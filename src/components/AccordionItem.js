import posed from 'react-pose';

const AccordionItem = posed.div({
  exit: {
    height: 0,
    transition: {
      ease: 'easeInOut',
      duration: 500
    }
  },
  enter: {
    height: 'auto',
    opacity: 1,
    transition: {
      ease: 'easeInOut',
      duration: 500
    }
  }
});

export default AccordionItem;
