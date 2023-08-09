import {useMediaQuery, useTheme} from "@mui/material";
import {Swiper, SwiperSlide} from "swiper/react";
import "swiper/scss";
import "swiper/scss/navigation";
import "swiper/scss/pagination";
import "swiper/scss/scrollbar";
import 'swiper/scss/grid'
import {MyCard} from "./product-card/MyCard.tsx";
import {EffectCoverflow, Navigation, Grid, Pagination, EffectCreative} from "swiper/modules";

export const CardsSwiper = (props: any) => {
    const theme = useTheme();
    const md = useMediaQuery(theme.breakpoints.up("md"));
    const lg = useMediaQuery(theme.breakpoints.up("lg"));
    const xl = useMediaQuery(theme.breakpoints.up("xl"));
    return (
        <Swiper
            spaceBetween={15}
            slidesPerView={xl ? 4 : lg ? 3 : md ? 2 : 1}
            grid={{rows: 2,fill:"row"}}
            pagination={{
                dynamicBullets: true,
            }}
            modules={[EffectCoverflow, Pagination, Navigation,Grid,EffectCreative]}
        >

            {props.data.map((prod: any) => (
                <SwiperSlide key={prod._id}>
                    <MyCard key={prod._id}  {...prod} setProduits={props.setProduits}
                            img={`uploads/${prod.img}`}/>
                </SwiperSlide>
            ))}

        </Swiper>
    );
};