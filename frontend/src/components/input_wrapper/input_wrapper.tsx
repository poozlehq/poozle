import { UseFormReturnType } from '@mantine/form';

import SelectWithFetch from '../../ui/select/select_with_fetch';
import Input from '../../ui/input/input';

import { Block, ElementType } from '../../types/form';

import styles from './input_wrapper.module.scss';

export type Props = {
  block: Block;
  inputProps: { [x: string]: any };
  key?: number;
};

function InputWrapper(props: Props) {
  const { type, element, label } = props.block;
  let Component: React.ReactElement = <></>;

  if (type === 'input') {
    if (element.type == 'select') {
      Component = (
        <SelectWithFetch
          label={label}
          name={element.action_id}
          placeholder={element.placeholder}
          fetchDataId={element.fetch_data_id}
          required
          data={element.data}
          value={props.inputProps.value}
          {...props.inputProps}
        />
      );
    }

    if (element.type === ElementType.TextInput) {
      Component = (
        <Input
          label={label}
          name={element.action_id}
          placeholder={element.placeholder}
          required
          {...props.inputProps}
        />
      );
    }
  }

  // if (type === 'section') {
  //   Component = (
  //     <>
  //       {blocks &&
  //         blocks.map((block: Block) => (
  //           <div className={styles.input}>
  //             <InputWrapper block={block} />
  //           </div>
  //         ))}
  //     </>
  //   );
  // }

  return <div key={props.key}>{Component}</div>;
}

export default InputWrapper;
