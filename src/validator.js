import * as Yup from 'yup';

export const validateChannels = (channels) => {
  const channelsNames = channels.map((channel) => channel.name);

  return Yup.object().shape({
    name: Yup.string()
      .trim()
      .min(3)
      .max(10)
      .notOneOf(channelsNames)
      .required(),
  });
};

export const submitMessageSchema = Yup.object().shape({
  message: Yup.string()
    .trim()
    .min(1),
});
