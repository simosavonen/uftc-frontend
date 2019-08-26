import posed from 'react-pose';

const AccordionItem = posed.div({
  enter: {
    y: 0,
    opacity: 1,
    delay: 100,
    transition: {
      y: { type: 'spring', stiffness: 500, damping: 15 },
      default: { duration: 200 }
    }
  },
  exit: {
    y: -30,
    opacity: 0,
    transition: { duration: 100 }
  }
});

export default AccordionItem;
