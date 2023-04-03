const viewtab = (event) => {
  const id = `awesome${event.target.id}`;
  const prevlink = document.querySelector('a.active');
  const sectionhide = document.querySelector('section.d-flex');
  const sectionview = document.getElementById(id);
  sectionhide.classList.toggle('d-flex');
  sectionhide.classList.toggle('d-none');
  sectionview.classList.toggle('d-flex');
  sectionview.classList.toggle('d-none');
  event.target.classList.toggle('active');
  prevlink.classList.toggle('active');
};

export default viewtab;
