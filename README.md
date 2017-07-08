# farecalculator
Calculates the cheapest weekly London PAYG fares for inputted journeys.

## INTRO
This fare calculator aims to calculate the best weekly fares (using either contactless or an oyster card and whether or not a monthly travel card should be applied) for travel between most tube, DLR and London Overground stations within zones 1-9. It also takes into account railcard / oyster type discounts.

## BACKGROUND INFORMATION
- There are different zones which are associated with different fares.
- Journeys are charged according to the zones travelled in. This takes in account any zones used to make the journey, for example a zone 3 - 2 - 3 journey would be charges a zone 2 to 3.
- There are some stations that count as ‘dual station’ e.g. Zones 2 or 3 (2/3). Therefore a journey from zone 2 to a 2/3 would be classified a zone 2 to 2, whilst a journey from zone 3 to 2/3 would be 3 to 3. From what I can see, you can make a single dual station to dual station journey without passing any single stations (e.g. 2/3 to 2/3), but not 2/3 to 3/4. This all gets a bit complicated when a travel card has been applied (e.g. 3/4) and when a journey is made from the same dual zone to dual zone (e.g. 2/3 to 2/3): since technically the journey should be considered 3 to 3 and be included in the travel card cost.
- The single charge can either be deemed ‘off peak’ or ’anytime’, and have  different values associated, depending on the time of first touch in and also the direction of travel (going from outside of zone 1 to zone 1 in the afternoon is off peak fares).
- Daily capping and weekly capping/travelcards can be applied to oyster and contactless, whereby journeys made within the zones covered by the daily cap or weekly cap are free and the weekly or daily cap fare is added to the total cost. Daily caps can either be anytime or only apply to off peak journeys, whilst weekly is always anytime.
- Weekends are always off peak, whilst weekdays are split into 5 time zones. Some time zones that are deemed ‘off peak’ charge single off peak fares but can count towards (and be capped by) either the off peak or anytime daily cap; and some time zones are deemed ‘peak’ charge single anytime fares and only count towards anytime daily cap — as expected. However in the early morning period, the single fare is charged off peak but only counts towards the anytime cap (and not the peak cap). Similarly, the afternoon travel time is charged single anytime fares, but can count (and be covered by) the off peak daily cap as well the anytime daily cap.
- Daily capping is automatically applied; the zones that are chosen differs between oyster and contactless (explained below), but both works out the cheapest combination: either an off peak daily cap with anytime journeys single fares added to the total, or an anytime daily, or no daily caps.
- For either daily capping or weekly cap/travelcards: when journeys are made to zones outside of the zones covered in these caps, an extension fare is charged. Oyster and contactless differ in the calculation of extension fares.
- Extension fares for journeys that overlap with the zones in the cap (e.g. A cap of 3-4 but a journey from 1-5) are the cheapest or either: the min zone to max zone (as if you had no cap; zone 1-5 single) or two singles (zone 1 single + zone 5 single).
- The anytime daily cap and off-peak daily cap is the same fare between zones 1-6. However, if you reach the daily anytime cap more than once a week for zones 1-4, 1-5 or 1-6, an automatic refund is applied. NB: when you reach the daily cap for 1-5 and also 1-4 - you would be refunded 1x 1-4 and 1 x 1-5 automatic refund.
- Daily caps always start at zone 1 (thus for dual zone to dual zone , whilst weekly can be e.g. 3-4. Since daily caps always start at zone 1, and at the moment dual zone to dual zone without passing single zones is only between 2/3 and 2/3 where a 2-2, 3-3 or 2-3 single fares are all the same, then a 2/3 to 2/3 journey automatically is deemed a 2 to 2 journey (so then a daily cap would be more easily reached) unless there is a weekly travelled that covers zone 3.

### Oyster
Oyster works in weird ways. After each journey:
- The maximum zone travelled in so far is updated.
- If the off-peak or anytime cap has been reached for the maximum zone travelled in so far, then the relevant cap is applied (whichever is cheaper)
- If a daily cap has been automatically applied (e.g. For zones 1-3) but a journey is made between 1-6, it would not charge the extension fare of 4-6; rather it would charge the total 1-6 despite the daily cap. VS weekly capping: it would be extension fares as expected.
- The chronological order of the journeys is important: E.g. a journey starting as zone 1-6 then rest of the day with multiple journeys between 1-2: all journeys are compared to the 1-6 daily cap (e.g. £12). VS if the journeys were first between 1-2 and then 1-6 is the last journey, the total fare would be charged up to the zone 1-2 daily cap, and then the final journey as an additional cost (so the 1-6 daily cap is not reached but zone 1-2 cap is - a charge of £9 for 1-2 cap + £1.3 for the single 1-6 journey = £10.3).
Weekly capping does not apply: only manually added weekly travel cards can be applied. In this manner contactless is often considered ‘cheaper’ than the oyster.

### Contactless
Contactless works in a more logical manner. It selects the cheapest combination of anytime or off peak daily caps or no daily and extension fares. So the chronological order is not important (and the 1-2 zone daily cap would’ve been applied either way in the oyster example).
Automatic weekly capping also applies.

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
What discount card and oyster card was submitted is also stored.

### Javascript

#### DAILY FARE
For both oyster and contactless:
- Single fares are based on the journey type (if afternoon or peak = anytime single fares / if early or offPeak = offPeak single fares), and taking into account any discounts applied.
- If dual zone to dual zone boolean is true, and a weekly travel card is applied, adjust the cost accordingly (e.g. Zone 2-2 journey but dual zone to dual zone boolean is true so it is actually zone 2/3 to 2/3 journey, and a weekly travel card of 3/4 is applied, then journey would be considered a zone 3-3 journey and be included in the travel card).
- For each journey, if min zone is smaller than the min cap zone and max zone is bigger than the max cap zone (I.e. The middle bit of the journey overlaps with the cap), then pick cheapest single fare - either the single fare from min single zone to max single zone (as if no caps applied) or the two singles added together.
- If a daily cap and a weekly travel card is applied (e.g. 1-2 daily and 5-6 weekly & a journey of 1-6): then the single fare would be the ‘gap’ zones (3-4).

##### Oyster daily
There are three running totals: offPeakTotal (all previous off peak single fares, or off peak daily cap if reached), peakTotal (all previous anytime single fares) and currentTotal (the current cheapest fare), maxZone - max zone travelled in so far.
FOR EACH JOURNEY
Get the appropriate single fare. If weekly travel cards are passed in - the single fare would be an extension fare for the zones travelled outside of the travel card zones.
Update the maximum zone travelled in so far (maxZone). If weekly travel card is passed in, then if there is any overlap between weekly travel card and the max Single, the maxZone would effectively be the minimum weekly travel card - 1 (to remove the overlap).
The single fare is added the current total.

For off peak or afternoon journeys:
- The single fare is added the offPeakTotal. The offPeakTotal is compared with the off peak daily cap for maxZone - if offPeakTotal is greater, then the current total becomes (I.e. Price is capped at) the off peak daily cap. A flag is set to indicate the offPeak daily cap has been met
- The peakTotal is added to the offPeakTotal (to get the fare if an off peak daily cap is applied with peak single fares added). If this value is smaller than the current total, then current total becomes peakTotal + offPeakTotal.

For peak or early (I.e. All other journeys) journeys:
- Add the single fare to the peakTotal. If the current total exceeds the anytime daily cap for the maximum zone, then instead the current total would become (I.e. Be capped by) the anytime daily cap. (The flag for using the offPeak daily cap would then be set back to false).

—> At the end of all journeys, an object is returned:
- The current total (the final total fare for the day)
- Whether an offPeak daily cap had been applied, if so, what zone is that offPeak daily cap.

##### Contactless daily
Have an array of all the possible fares (= TotalArray). All the different possible combinations of anytime daily/offpeak/no cap is calculated and added to this array. These combinations include:
All the possible anytime daily caps:
- For each journey, calculate the single fare (extension fares if the zones exceed the daily cap zones). Add them all together + the cost of the anytime daily cap.
All the possible offPeak daily caps:
- For each offPeak or afternoon journey types, calculate the single fare (extension fares if the zones exceed the daily cap zones). For peak or early type journeys (I.e. All other journeys) get the single fare. Add all offPeak single fares + peak single fares + cost of the offPeak daily cap.
The total cost if no caps are applied.
- Get all the single fares for each journey.

From the TotalArray, the cheapest fare is obtained. If this fare was from the offPeak daily cap array, then set a flag and get the zone for that offPeak daily cap.
An object is returned:
- The cheapest total fare for that day
- Whether an offPeak daily cap had been applied, if so, what zone is that offPeak daily cap.

#### WEEKLY FARE
Contactless and oyster weekly
- If Zones 1-4 or 1-5 or 1-6 offPeak daily cap was reached more than twice a week then apply the appropriate refund x no. Of days & minus from the week total.

##### Contactless Weekly
Again, there is an array of all the possible fares.
For all the different possible weekly Travelcards:
- For each day - get the total day fare, taking into account the weekly travel card.
- Add all the day fares together + cost of weekly travel card to TotalArray
When no weekly travel card is applied, add together al the daily fares.
--> All the different combinations of weekly is compares and the cheapest fare obtained and returned.

##### Oyster Weekly.
This is the same process as contactless to find the cheapest weekly cost, but also returns whether a weekly travelcard cap has been applied (and if so what zones are covered).
If a weekly travel card has been applied, then the cost of the week if a monthly travel card is applied instead of a weekly travel card is calculated.
An object is then returned:
- The travelcap cap applied (noCap if none applied)
- Weekly value: the week total if a weekly travel card was bought (false if none)
- Monthly value: the week total if a monthly travel card was bought (false if none)
