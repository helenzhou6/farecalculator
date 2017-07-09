# farecalculator
Calculates the cheapest weekly fare for inputted tube, overground and dlr journeys. Check it out [here](http://tfl-calculator.com/).

## INTRO
This fare calculator aims to calculate the best weekly fares (using either contactless or an oyster card and whether or not a monthly travel card should be applied) for travel between tube, DLR and London Overground stations within zones 1-9. It also takes into account railcard / oyster type discounts. Journeys must be in chronological order. Days are defined from 4:30am until 4:29am. Although every effort is made to ensure that fares calculated are correct, we can’t guarantee that all of them are accurate; more details are found in the Disclaimer section below.

## GENERAL INFORMATION

### Oyster cards
Oyster cards are used to store pay as you go credit, and bought weekly, monthly and annual travel cards. Certain types of oyster cards and certain discount cards that can be applied to the oyster allow for discounted travel. The oyster card charges each journey in isolation, and automatically stops charging you once you reach the appropriate daily cap for the zones used. If a travel card has been applied and you travel outside of the zones covered by the travel card, you are charged an extension fare.

### Contactless
Contactless payment charges adult-rate pay as you go fares. You can benefit from automatic daily and weekly (Monday to Sunday) capping; just use the same card, mobile phone or contactless device for all your travel. With contactless, you are charged the cheapest combination of zonal cap(s) and extension fare(s).

### Contactless vs Oyster
Although oyster cards and contactless charge the same adult-rate single fares, you may be charged a different fare for multiple journeys. [This video](http://londonist.com/2016/06/oyster-fares-and-contactless-not-always-the-same-price) demonstrates the difference. This fare calculator tries to replicate the method that oyster and contactless uses to calculate fares, and generates the total week fare for your journeys. This can help you decide whether you are better off using an oyster card (with a weekly or monthly travel card and/or discount cards applied to it) or contactless.

## HOW THE APPLICATION WORKS
### UI
Users will enter the type of oyster card they have, and any discount card applied to it.
Users will enter journeys (start location to end location) into a form, that are split by day. For each journey, the user will need to select the time frame that they would touch in for that journey (e.g. 16:00 to 18:00). There is error handling that deals with errors such as incomplete journeys and station names.
Upon submitting, the results will be displayed: the calculated best total weekly fare if using a contactless card, and the calculated best total weekly fare when using an oyster (displaying what the best zone to zone weekly travelcard should be added if any) and the calculated best total weekly fare (if a monthly travel card has been applied to the oyster).

### JSON
There are two JSON files:
- One that contains the single fares (offPeak or anytime), daily caps (offPeak or anytime), weekly travel cards, monthly travel cards and the discounts for off peak weekly refunds. In addition, it would contain the fares for discounted travel (e.g. Apprentice oyster cards and/or railcard discounts).
- Another one which has been generated from the TFL API that lists all the possible overground/DLR/tube stations, and details about each station (including the zone and whether it is a dual zone station).

### API
The TFL Journey Planner API is used, with a journey made at 13:00 about a month in advance, with only DLR, London Overground and tube stations enabled. Upon submission of the journeys, the first default journey from the API is processed. The start and destination stations, and all the stop points between the two stations is obtained, and each journey is processed using javascript each journey.
An object should be returned for each journey:
- The Minimum and maximum zones travelled in. If it is a mix of dual zone stations and single stations, the dual zone station would be the zone that is numerically closer to the single station zones (for the cheapest fare). For dual zone station to dual zone station journeys (without any single zone stations in between), the lowest minimum zone would be the zones outputted (e.g. Zone 2/3 to 2/3 would be deemed a Zone 2 to 2 journey).
- Whether it was a dual zone station to dual zone station journey (boolean) - e.g. Zone 2/3 station to a zone 2/3 station.
- The type of journey: either offPeak, anytime, early or afternoon (based on the user input of journey times).
- What discount card and oyster card was submitted is also stored, so that the fares are adjusted accordingly.

### Javascript

#### DAILY FARE
- Single fares are based on the journey type (if afternoon or peak = anytime single fares / if early or offPeak = offPeak single fares), and taking into account any discounts applied.
- If a daily cap and a weekly travel card is applied (e.g. 1-2 daily and 5-6 weekly & a journey of 1-6): then the single fare would be the ‘gap’ zones (3-4).
- For each journey, if a travelcard or daily cap has been applied and the journey overlaps these zones, the cheapest single fare is chosen - either the single fare from minimum zone to the maximum single zone (as if no caps applied) or the two singles added together.
- The cost is adjusted accordingly for dual zone to dual zone journeys (e.g. Zone 2-2 journey but dual zone to dual zone boolean is true so it is actually zone 2/3 to 2/3 journey, and a weekly travel card of 3/4 is applied, then journey would be considered a zone 3-3 journey and be included in the travel card).
- Oyster and contactless are completely different functions since they calculate fares in drastically different ways. For oyster, after each journey the maximum zone travelled in is recorded, and where applicable the price is capped at the maximum zone daily cap. With contactless, all the possible combinations of daily caps are processed and the cheapest option selected.

#### WEEKLY FARE
All the different combinations of weekly travelcards (or none) is compared and the cheapest fare and travelcard is selected. Also offPeak refunds are taken into account: if Zones 1-4 or 1-5 or 1-6 offPeak daily cap was reached more than twice a week then the appropriate refund is applied.

## DISCLAIMER
Whilst every effort is made to ensure that fares calculated on this site are correct, we can’t guarantee that all of them are accurate.
The following are known issues that could cause fare discrepancies, or ways to achieve a cheaper weekly fare that the fare calculator does not take into account:
- Automatic refund payments are given to all off-peak pay as you go customers who repeatedly reach a Zones 1-4 or Zones 1-6 daily cap, but only travel at off-peak times for:
	•	Two or more days in a single week (from Monday to Sunday), or
	•	Four or more days in a fortnight, or
	•	Eight or more days in four weeks
If you are eligible for an automatic refund, it is automatically applied from the Friday of the following week. However, this fare calculator calculates any automatic refund(s) and deducts it from the week total immediately.
- Some journeys,  irrespective of the route taken, are automatically charged to include Zone 1 and capping reflects this. However, some journeys could be cheaper based on the route taken (such as avoiding Zone 1) and you have touched your card on the pink card readers when changing platforms. The fare calculator is based on the first default journey generated from the TFL journey planner, and does not take into account any cheaper alternate routes. The best way to check whether there are any cheaper alternate routes for your journey would be to use the [TFL Single Fare Finder here](https://tfl.gov.uk/fares-and-payments/fares/single-fare-finder).
- The weekly cost of a monthly travel card is based on the following formula: the cost of the (monthly travel card * 12) / 52. This may not be completely accurate since monthly travel cards last the number of days in the month in which they start.
- Weekly, monthly and annual travel cards start from 00:01 on the start date to 04:29 on the day after the expiry date shown. Daily caps however, operate between 04:30 until 04:29 of the following morning. Therefore it may be cheaper to buy the weekly travel card if you are travelling a lot between 00:01 and 04:30.
- There are instances when using the oyster is not always the best option; find more details [here](http://www.oyster-rail.org.uk/when-not-to-use-oyster/). It may also be cheaper to combine paper tickets and PAYG [here](http://www.oyster-rail.org.uk/mixing-oyster-and-paper-tickets/).
- The costs of each journey is based on a journey made in about a month in advance, and assumes the cost of the journey from a to b is the same as b to a. Therefore possible travel disruptions during this time and other factors could make the cost of the journey less accurate.
- There are some journeys that are exceptions to the usual daily cap and single fares. For example travel between Euston (national rail station) and Watford Junction before 9:30 (and travel in the opposite direction between 16:00 and 19:00) are charged off-peak fares. There are also a number of earlier starts to the off-peak cap at the extremities of the PAYG area (for example North of Headstone Lane, details [here](https://tfl.gov.uk/fares-and-payments/what-are-ca#on-this-page-2). These have not been accounted for.
- The calculations rely on the TFL Journey Planner API - which may not always be accurate. For example, it may be cheaper to walk between two stations (such as between Aldgate Underground Station and Tower Hill Underground Station), however the API returns a 1 minute tube journey by default. Always make sure all your journeys are cost-worthy by checking them against the [TFL Journey Planner here](https://tfl.gov.uk/plan-a-journey/), and remember it may be cheaper to walk or take the bus.
