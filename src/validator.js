import * as Yup from 'yup';

export const validateChannels = (channels) => {
  const channelsNames = channels.map((channel) => channel.name);

  return Yup.object().shape({
    name: Yup.string()
      .trim()
      .min(3, 'Too short, minimum length is 3 symbols!')
      .max(10, 'Too long, maximum length is 10 symbols!')
      .notOneOf(channelsNames, 'Channel name must be unique!')
      .required('Required'),
  });
};

export const submitMessageSchema = Yup.object().shape({
  message: Yup.string()
    .trim()
    .min(1, 'You can not submit empty form'),
});
