import style from '../styles/collection.module.css';

import { MainLayout } from '~/layout/main-layout/main-layout';
export default function Collection() {

  return (
    <MainLayout classNameContent="app-container my-6">
      <h2 className={style.collectionTitle}>Коллекции и подборки</h2>
      <div className={style.collectionWrap}>
        {Array.from({ length: 36 }).map((_, key) => (
          <div key={key} className={style.collectionItemWrap}>
            <div className={style.collectionItemBgOne} />
            <div className={style.collectionItemBgSec} />

            <div className={style.collectionItem}>
              <span>подборка {key + 1}</span>
            </div>
          </div>
        ))}
      </div>
    </MainLayout>
  );
}
