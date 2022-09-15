import { Block, ElementType } from '../../types/common';
import Input from '../../ui/input/input';
import RTE from '../../ui/rte/rte';
import SelectWithFetch from '../../ui/select/select_with_fetch';

export interface Props {
  block: Block;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  inputProps: Record<string, any>;
  key?: number;
}

const InputWrapper = (props: Props) => {
  const { type, element, label } = props.block;
  let Component: React.ReactElement | null = null;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onChange = (e: any) => {
    if (element.type === ElementType.TextEditor) {
      props.inputProps.onChange(e);
    }

    props.inputProps.onChange(e);
  };

  if (type === 'input') {
    if (element.type === 'select') {
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
          onChange={onChange}
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
          onChange={onChange}
        />
      );
    }

    if (element.type === ElementType.TextEditor) {
      Component = (
        <RTE
          label={label}
          name={element.action_id}
          placeholder={element.placeholder}
          required
          value={props.inputProps.value}
          {...props.inputProps}
          onChange={onChange}
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
};

export default InputWrapper;
