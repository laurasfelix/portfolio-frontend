import {View, StyleSheet, Dimensions} from "react-native";
import colors from "@/utils/colors";
import SmallCard from "@/components/landing/SmallCard";
import {CardProps} from "@/utils/card";

//   color: string;
//   role: string;
//   company: string;
//   text: string[];
//   pictures: string[];
//   icon: string;

const LargeCard = ({ pictures, ...rest }: CardProps) => {

    return (
        <View>

            <View>
                <SmallCard {...rest} />
            </View>

        </View>
    );

};

const styles = StyleSheet.create({

})

export default LargeCard;