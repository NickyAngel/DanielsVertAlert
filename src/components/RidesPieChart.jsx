import { View, Text, StyleSheet, ScrollView } from "react-native";
import { PieChart } from 'react-native-svg-charts'
import { Rect, Svg } from 'react-native-svg'
import { material } from "react-native-typography";


const getColorFromLift = name => {
    const liftToColor = {
        'Collins': '#0E1FE9',
        'Wildcat': '#F31705',
        'Sugarloaf': '#61C925',
        'Supreme': '#1D1D1D',
        'Sunnyside': '#E9F809',
        'Albion': '#09F8DF',
        'Collins Angle': '#F809C9'
    }
    if (name in liftToColor) {
        return liftToColor[name];
    }
    // Default for any weird lift I may not have remembered.
    return '#636363';
}

const RidesPieChart = ({ numRidesPerLift }) => {
    const pieChartData = [];
    for (const lift in numRidesPerLift) {
        pieChartData.push({
            key: lift,
            amount: numRidesPerLift[lift],
            svg: { fill: getColorFromLift(lift) }
        });
    }
    const labels = [];
    for (lift in numRidesPerLift) {
        labels.push(
            <View style={styles.labelContainer} key={`labelForSeasonPieChart-${lift}`}>
                <Text style={styles.labelText}>{lift}</Text>
                <Svg width="50" height="20">
                    <Rect
                        x="0"
                        y="5"
                        width="50"
                        height="15"
                        fill={getColorFromLift(lift)}
                        strokeWidth="3"
                        stroke="rgb(0,0,0)"
                    />
                </Svg>
            </View>);
    }

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.h2}>Are you skiing Collins enough?</Text>
            <View style={styles.labels}>{labels}</View>
            <PieChart
                style={{ height: 200 }}
                valueAccessor={({ item }) => item.amount}
                data={pieChartData}
                spacing={0}
                outerRadius={'95%'}
                innerRadius={'33%'}
                padAngle={0}
            >
            </PieChart >
        </ScrollView>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 22
    },
    h2: {
        paddingBottom: 12,
        ...material.headline,
    },
    labels: {
        paddingTop: 8,
        paddingBottom: 16,
    },
    labelContainer: {
        flex: 1,
        alignItems: "stretch",
        justifyContent: "flex-start",
        flexDirection: "row",
    },
    labelText: {
        paddingRight: 20,
        width: '50%',
        ...material.subheading,
    }
});

export default RidesPieChart;