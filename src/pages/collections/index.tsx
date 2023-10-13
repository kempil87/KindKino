import Link from 'next/link';

import {COLLECTIONS} from '~/shared/constants/collections';
import {ROUTES} from '~/shared/constants/routes-links';

import style from '../../styles/collection.module.css';

import { MainLayout } from '~/layout/main-layout/main-layout';
export default function Collections() {

  return (
    <MainLayout classNameContent="app-container my-6" headProps={{title:'Коллекции и подборки'}}>
      <h2 className={style.collectionTitle}>Коллекции и подборки</h2>
      <div className={style.collectionWrap}>
        {COLLECTIONS.map((el) => (
          <Link key={el.id} className={style.collectionItemWrap} href={ROUTES.collection(el.slug)}>
            <div className={style.collectionItemBgOne} />
            <div className={style.collectionItemBgSec} />

            <div className={style.collectionItem}>
              <span>{el.name}</span>
              {/*<p>{el.description}</p>*/}
            </div>
          </Link>
        ))}
      </div>
    </MainLayout>
  );
}
