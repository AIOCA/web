import React, { Component } from "react";
import { TextBlock } from "../components/textblock";
export default class Home extends Component<any, any>{
    render() {
        return (
            <div className="home">
                <TextBlock 
                    title="All In One Commute App" 
                    subtitle="Commuting made easier" 
                    content="In the last few years we saw the arrival of many online cab services to Indian cities. The benefits were
                    the ease of finding a taxi and charge that already fixed before hiring one. People started using it very
                    frequently so that all the major services like Uber, Ola became a success in all the cities they launched
                    it. Most of the cases we have to check the fares and ETA of all the services to find the best one
                    available. So keeping all these apps in our smartphones and checking everyone of them before a
                    commute is a hustle. Even after we do that, the ease of hiring a cab is there but what if we want to
                    compare it with the public transport like metros we will have to spend more time going through the
                    searches for their timings.
                    Existing Technology
                    Services like Uber, Ola has there own apps. Some of the metro services also have a timetable of their
                    services but doesn&#39;t have an official app to make things easier."
                    image={"https://www.geotab.com/wp-content/uploads/2019/04/time-to-commute.png"}
                />

                <TextBlock 
                    title="Drawbacks" 
                    subtitle="" 
                    content="Different cab Services have different apps. Which raise the necessity of checking all the apps
                    before taking a commute.
                     These apps won&#39;t have a combination of the modes of transport as they are apps coming from
                    one of the companies itself.
                     Someone new to a city or an occasional visitor might not know the services available in a city.
                    This may be because the city has its own local services (like kochin1) or the service may not be
                    available in the city they are coming from."
                    image={"https://www.ft.com/__origami/service/image/v2/images/raw/http%3A%2F%2Fcom.ft.imagepublish.upp-prod-us.s3.amazonaws.com%2F81b1f4e4-f5b2-11e9-9ef3-eca8fc8f2d65?fit=scale-down&source=next&width=700"}
                />
                    

                <TextBlock 
                    title="Solution" 
                    subtitle="" 
                    content="If we want to know the best combination of these methods to reach from one point to another. Let&#39;s
                    say we are at point ‘A’ and our destination is point ‘B’ which is like 15km apart. 2Km from point ‘A’
                    and 3km from point ‘B’ we have metro stations. So the best method (keeping fare as a constraint) to
                    connect these two points might not be hiring a cab from ‘A’ and ‘B’ but to hire a cab to those to metro
                    stations and connect that 10km by metro. What we suggest is an app that can compare combinations
                    of transport methods like this and help us to figure out the best mode for us."
                    image={"https://www.linkedin.com/media-proxy/ext?w=1200&h=675&hash=KdSCK1AdjHDMpf2SwUJvQFwoYuk%3D&ora=1%2CaFBCTXdkRmpGL2lvQUFBPQ%2CxAVta5g-0R6plxVUzgUv5K_PrkC9q0RIUJDPBy-nWiOs_NWfZnbvf8HfZLSiolgXfyUCmQIyfOurQDnjEo69LcLmY4Yx3A"}
                />    

                <TextBlock 
                    title="Advantages" 
                    subtitle="" 
                    content={(
                    <ol>
                        <li>Users can save time and money by finding the best deal in different services</li>
                        <li>Same time from checking all the services before a ride</li>
                        <li>Can find the best combination of all the services in just a few taps</li>
                    </ol>
                    )}
                    image={"https://www.alert-software.com/hs-fs/hubfs/Blog/advantages-of-email-communiction.jpg?width=1000&name=advantages-of-email-communiction.jpg"}
                />      
            </div>

        )
    }
}