import { Text, StyleSheet, ScrollView } from "react-native";

import { material } from "react-native-typography";

import RidesPieChart from "../components/RidesPieChart";
import LiftBreakdownTable from "../components/LiftBreakdownTable";
import { getNumRidesPerLift } from "../RideUtils";


function pRNG(seed) {
    seed = seed % 2147483647;
    if (seed <= 0) seed += 2147483646;
    return seed * 16807 % 2147483647;
};

function pickHeaderText(numRidesPerLift) {
    const totalLaps = Object.values(numRidesPerLift).reduce((prev, acc) => prev + acc);
    percentages = {}
    for (lift in numRidesPerLift) {
        percentages[lift] = numRidesPerLift[lift] / totalLaps;
    }
    const headerOptions = [];
    headerOptions.push("Have you heard of our lord and savior Aggie's?");
    headerOptions.push("Do you have a moment for our lord and savior Aggie's?");
    if ('Collins Angle' in numRidesPerLift) {
        if (percentages['Collins Angle'] > 0.02) {
            headerOptions.push('Wow you really just love watching other people ride the chair');
            headerOptions.push('You are King of The Cucks');
            headerOptions.push('You ski the Angle more than a tourist from Texas');
        }
    } else {
        headerOptions.push('What, are you too good for the Midstation?');
        headerOptions.push("The Midstation is Calling and You Must Go");
        headerOptions.push("Nobody knows what the Midstation is capable of");
        if ('Collins' in numRidesPerLift) {
            headerOptions.push('Not skiing the Midstation eh? Just love dodging tourists on Corkscrew?');
        }
    }
    if ('Collins' in numRidesPerLift) {
        if (percentages['Collins'] > 0.98) {
            headerOptions.push("You are an enlightened being");
            headerOptions.push("You ski like Dan Withey");
            headerOptions.push("You're the best skier on the mountain");
            headerOptions.push("The Chairlift Hecklers called, they said they want you on their team");
        } else if (percentages['Collins'] > 0.90) {
            headerOptions.push("Not bad, but you can do better");
            headerOptions.push("Are your Sugarhouse friends dragging you away from Collins?");
            headerOptions.push("Thirds and Aggie's, what else do you need?");
            headerOptions.push("You better not be skiing Supreme");
            headerOptions.push("Are you skiing Collins enough?");
        } else {
            headerOptions.push("Ask not what Collins can do for you, but what you can do for Collins");
            headerOptions.push("I think therefore I Collins");
            headerOptions.push("Collins is the opium of the masses");
            headerOptions.push("A Collins for a Collins makes the whole world blind");
            headerOptions.push("Shoot for the moon, if you fall you'll land on Collins");
            headerOptions.push("To Collins or not to Collins, that is the question");
            headerOptions.push("They're taking the hobbits to Collins-gard");
            headerOptions.push("Live Laugh Collins");
            headerOptions.push("The Few, The Proud, The Collins");
            headerOptions.push("Collins: What Dreams are made of");
            headerOptions.push("Ski Collins like no one's watching");
            headerOptions.push("Do not go gently into that good Aggies");
            headerOptions.push("All that glitters is gold. Only shooting stars ski Collins");
            headerOptions.push("Never gonna give Collins up, never gonna let Collins down");
            headerOptions.push("Turning and turning in the widening Corkscrew. " +
                "The ski schooler cannot hear the instructor. The center cannot hold. Collins falls apart");
            headerOptions.push("So we beat on, boats against the current, borne back ceaselessy into Collins");
            headerOptions.push("Tell me, what is it you plan to do with your one wild and precious life? It better be riding Collins");
            headerOptions.push("I'm a pessimist because of snowfall, but an optimist because of Aggie's");
            headerOptions.push("The road goes ever on and on, down from the Collins where it began");
        }
    }
    if ('Supreme' in numRidesPerLift) {
        if (percentages['Supreme'] > 0.1) {
            headerOptions.push("Why are you having picnics out in Catherine's when you could be skiing?");
            headerOptions.push("Are you skiing No 9 Express because you miss skiing out east?");
            headerOptions.push("Do you like Supreme or just the taint massage the lift gives you");
            headerOptions.push("You been lapping the diving board or do you just not know about Aggie's?");
            headerOptions.push("It's okay, everyone has to start somewhere");
            headerOptions.push("Have you ever seen Dan Withey ski Supreme?");
            headerOptions.push("If you ski Collins they let you shoot the Howitzer");
        }
    }
    if ('Sugarloaf' in numRidesPerLift) {
        if (percentages['Sugarloaf'] > 0.1) {
            headerOptions.push("You know you can ski Around The World from Collins right?");
            headerOptions.push("I love dodging people on Rollercoaster too");
            headerOptions.push("It's okay we all have to start somewhere")
        }
    }
    if ('Sunnyside' in numRidesPerLift) {
        headerOptions.push("I wish I had 5 friends to ride Sunnyside with");
        headerOptions.push("The Vail Ridge Double is Alta's Freeride line");
        headerOptions.push("Do you live in East Alta? Why are you skiing Sunnyside?");
        headerOptions.push("December must've been rough without Sunnyside open");
    }
    // Round time to nearest 5 min mark as a seed to avoid this refreshing too much.
    const seed = Math.floor(Date.now() / (1000 * 60 * 5)) * 1000 * 60 * 5;
    return headerOptions[pRNG(seed) % headerOptions.length];
}

const DonutView = ({ ridesData, refreshControl }) => {
    if (!ridesData) {
        return <ActivityIndicator size={'large'} />;
    }

    const numRidesPerLift = getNumRidesPerLift(ridesData);
    let colorCommentary = pickHeaderText(numRidesPerLift);
    return (
        <ScrollView style={styles.statsViewContainer} refreshControl={refreshControl}>
            <Text style={styles.h1}>
                Your Blue Donut
            </Text>
            <Text style={styles.h2}>{colorCommentary}</Text>
            <RidesPieChart numRidesPerLift={numRidesPerLift} />
            <LiftBreakdownTable numRidesPerLift={numRidesPerLift} />
        </ScrollView>
    )
};


const styles = StyleSheet.create({
    statsViewContainer: {
        flex: 1,
        paddingTop: 22,
        marginLeft: 8,
        marginRight: 8,
    },
    h1: {
        paddingBottom: 12,
        ...material.display2,
    },
    h2: {
        ...material.headline,
    },
});

export default DonutView