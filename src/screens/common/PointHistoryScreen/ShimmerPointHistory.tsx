import {Block, Shimmer} from 'components';
import {COLORS, width} from 'theme';

const ShimmerPointHistory = () => {
  return (
    <Block flex padding={15}>
      {Array.from({length: 10}).map((_item, idx) => (
        <Block
          radius={10}
          marginBottom={15}
          width={'100%'}
          height={100}
          rowCenter
          padding={15}
          key={idx}
          backgroundColor={COLORS.white}>
          <Shimmer width={60} height={70} />
          <Block marginLeft={15} flex>
            <Shimmer width={width / 2} height={30} />
            <Block marginTop={20} rowCenter justifyContent="space-between">
              <Shimmer radius={5} width={width / 4} height={20} />
              <Shimmer radius={5} width={width / 5} height={20} />
            </Block>
          </Block>
        </Block>
      ))}
    </Block>
  );
};

export default ShimmerPointHistory;
