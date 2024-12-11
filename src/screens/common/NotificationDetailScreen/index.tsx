import {StaticScreenProps} from '@react-navigation/native';
import {Block, HeaderTitleNoBackground, Icon, Loading, Text} from 'components';
import moment from 'moment';
import {useGetNotifications, useGetNotifiDetail} from 'queries/notification';
import React, {useEffect} from 'react';
import WebView from 'react-native-webview';
import {COLORS} from 'theme';

type ScreenProps = StaticScreenProps<{id: number}>;
const NotificationDetailScreen = ({route}: ScreenProps) => {
  const {data, isPending, isSuccess} = useGetNotifiDetail({id: route.params.id});

  const {refetch} = useGetNotifications();
  useEffect(() => {
    if (isSuccess) {
      refetch();
    }
  }, [isSuccess]);

  return (
    <Block flex backgroundColor={COLORS.bgSuccess}>
      {isPending && <Loading />}
      <HeaderTitleNoBackground title="Chi Tiết Thông Báo" canGoBack />
      <Block flex backgroundColor={COLORS.white} paddingHorizontal={16}>
        <Text marginTop={12} fontSize={15} font={'semiBold'}>
          {data?.data.title || ''}
        </Text>
        <Block rowCenter marginTop={12} marginBottom={16}>
          <Icon name={'clock'} type={'EvilIcons'} size={15} color={COLORS.philippineGray1} />
          <Text font={'regular'} color={COLORS.philippineGray1} fontSize={13}>
            {moment.unix(data?.data.created_at || 0).format('DD-MM-YYYY')}
          </Text>
        </Block>
        <WebView
          originWhitelist={['*']}
          source={{
            html: `
                      <html>
                        <head>
                          <style>
                            body {
                              font-size: 40px; /* Bạn có thể tăng giá trị này để chữ lớn hơn */
                              line-height: 1.6; /* Giãn dòng để dễ đọc hơn */
                              color: #000; /* Màu chữ */
                            }
                          </style>
                        </head>
                        <body>
                        ${data?.data.content || ''}
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

export default NotificationDetailScreen;
