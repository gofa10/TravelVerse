import Carousel from 'react-bootstrap/Carousel';
import cloud from '../../../Assets/videos/مشهد سحاب للمونتاج 4k(1080P_HD).mp4';
import travel from '../../../Assets/images/pexels-hebaysal-773471.jpg';
import plane from '../../../Assets/images/pexels-pascalr-113017-removebg-preview.png';
import styles from '../../../Style/HomeStyle/SliderHero.module.css';
import { useTranslation } from 'react-i18next';

function SliderHero() {
  const { t } = useTranslation();
  return (
    <Carousel fade interval={5000} className={styles.slider} nextIcon={<span className="carousel-control-next-icon" />} prevIcon={<span className="carousel-control-prev-icon" />}>
      <Carousel.Item>
        <video autoPlay loop muted className={styles.vid}>
          <source src={cloud} type="video/mp4" />
        </video>
        <div className={styles.image}>
          <img src={plane} alt="Plane" />
        </div>
        <Carousel.Caption className={styles.caption_main}>
          <h3>First slide label</h3>
          <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
        </Carousel.Caption>
        {/* <div className='caption-bottom'>
        <div >{t('knowledge')} === </div>
                        <div >
                            <h5>{t('awesom')}</h5>
                            <p>{t('Lorem')}</p>
                        </div>
        </div> */}
             
      </Carousel.Item>

      <Carousel.Item>
        <img src={travel} alt="Travel" className="w-100" />
        <Carousel.Caption className={styles.caption_main}>
          <h3>Second slide label</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </Carousel.Caption>
        {/* <div className='caption-bottom'>
        <div >{t('knowledge')} === </div>
                        <div >
                            <h5>{t('awesom')}</h5>
                            <p>{t('Lorem')}</p>
                        </div>
        </div> */}
             
      </Carousel.Item>

      <Carousel.Item>
        <img src={travel} alt="Travel" className="w-100" />
        <Carousel.Caption className={styles.caption_main}>
          <h3>Third slide label</h3>
          <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
        </Carousel.Caption>
        {/* <div className='caption-bottom'>
        <div >{t('knowledge')} === </div>
                        <div >
                            <h5>{t('awesom')}</h5>
                            <p>{t('Lorem')}</p>
                        </div>
        </div> */}
      </Carousel.Item>
    </Carousel>
  );
}

export default SliderHero;
