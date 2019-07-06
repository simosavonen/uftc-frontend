import posed from 'react-pose';

const AccordionItem = posed.div({
  exit: {
    height: 0,
    opacity: 0,
    transition: {
      ease: 'easeInOut',
      duration: 250
    }
  },
  enter: {
    height: 'auto',
    opacity: 1,
    transition: {
      ease: 'easeInOut',
      duration: 300
    }
  }
});

export default AccordionItem;
