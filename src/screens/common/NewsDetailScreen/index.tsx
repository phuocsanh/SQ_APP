import {StaticScreenProps} from '@react-navigation/native';
import {Block, HeaderTitleNoBackground, Icon, Image, Text} from 'components';
import moment from 'moment';
import {useGetNewsDetail} from 'queries/news';
import React from 'react';
import {Platform} from 'react-native';
import WebView from 'react-native-webview';
import {COLORS, width} from 'theme';

type ScreenProps = StaticScreenProps<{
  item_id: string;
}>;
const NewsDetailScreen = ({route}: ScreenProps) => {
  const item_id = route.params.item_id;
  const {data} = useGetNewsDetail(item_id);

  return (
    <Block flex backgroundColor={COLORS.white}>
      <HeaderTitleNoBackground title="Tin Tức" canGoBack />
      <Block flex backgroundColor={COLORS.white} paddingHorizontal={16}>
        <Image source={data?.picture || ''} width={'100%'} radius={4} height={width * 0.35} />
        <Text marginTop={12} fontSize={15} font={'semiBold'}>
          {data?.title}
        </Text>
        <Block rowCenter marginTop={12} marginBottom={16}>
          <Icon name={'clock'} type={'EvilIcons'} size={15} color={COLORS.philippineGray1} />
          <Text font={'regular'} color={COLORS.philippineGray1} fontSize={13}>
            {data?.created_at ? moment.unix(data.created_at).format('DD-MM-YYYY') : ''}
          </Text>
        </Block>
        <WebView
          originWhitelist={['*']}
          source={{
            html: `
                <html>
                <head>
                  <meta name='viewport' content='width=device-width,initial-scale=1,maximum-scale=1'>
                  ${styles}
                </head>
                        <body >
                        ${data?.content || ''}
                        </body>
                      </html>
                    `,
          }}
          style={{flex: 1, minHeight: 200}}
        />
      </Block>
    </Block>
  );
};

const fontFamily = Platform.select({
  ios: '-apple-system',
  android: 'Myriad Pro',
});

const styles = `<style type="text/css">
  * {
    font-size: 15px !important;
    text-align: justify;
    line-height: 1.5;
    font-family: ${fontFamily} 
  }
  body {
    margin: 0;
    flex:1,
    padding-bottom: 15;
  }
  img {
    max-width: 97%;
    height: auto;
    margin: 10px 5px 10px 5px;
  }
  p, figure {
    padding: 0;
    margin: 0;
  }
</style>`;

export default NewsDetailScreen;
