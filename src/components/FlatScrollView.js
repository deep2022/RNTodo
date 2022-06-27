import React from 'react';
import { FlatList } from 'react-native';

const FlatScrollView = props => {
    return <FlatList {...props} data={[{}]} keyExtractor={() => null} renderItem={() => <>{props.children}</>} />;
};
export default FlatScrollView;