import { Input as NativeBaseInput, IInputProps, FormControl } from 'native-base';

type Props = IInputProps & {
  errorMessage?: string | null;
}

export function Input({ errorMessage = null, isInvalid, ...rest }: Props) {
  const invalid = !!errorMessage || isInvalid; //!!faz virar booleano

  return (
    <FormControl isInvalid={invalid} mb={3}>
      <NativeBaseInput
        backgroundColor='gray.600' //cor de fundo
        h={14} //height
        px={4}  //pading na horizontal
        borderWidth={0} //largura da borda
        fontSize='md' //fontesize
        color='white' //cor do texto
        fontFamily='body' //msm fonte do corpo da aplicação
        isInvalid={invalid}
        _invalid={{
          borderWidth: 1,
          borderColor: 'red.500',
        }}
        placeholderTextColor='gray.300' //cor do placeholder
        _focus={{ //customizar o focus do input
          bg: 'gray.700',
          borderWidth: 1,
          borderColor: 'green.500',
        }}
        
        {...rest}
      />
      <FormControl.ErrorMessage>
        {errorMessage}
      </FormControl.ErrorMessage>
    </FormControl>
  );
}