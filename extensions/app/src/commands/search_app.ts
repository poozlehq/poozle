import { AbstractCommand, Spec, DoParams, Builder } from '@poozle/edk';
import { SearchResult } from '@poozle/edk/lib/cjs/builder';
import { ChildProcess } from 'child_process';

import { SearchAppAction } from '../actions';

import { App } from '../types';

import { cliGet } from '../utils/cli';

const { Option } = Builder;
export class SearchAppCommand extends AbstractCommand {
  key = 'search-app';
  name = 'Search Local App';
  description = 'Search Local App';
  icon = 'github.svg';

  fetchDataKeys: Array<string> = ['search_app', 'open_app'];

  // TODO: hard type it later
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  getActions(): any[] {
    return [new SearchAppAction()];
  }

  async fetchDataController(key: string, params: DoParams, spec: any){
    console.log('here')
    if (key === 'search_app') {
      const shScript = "mdfind kMDItemKind = \"Application\" | \
      while IFS='\n' read -r path ;  do   for i in \"${path[@]}\";   do   \
      x=$(defaults read \"$i\"/Contents/Info.plist CFBundleIconFile);   \
      name=$(mdls -n kMDItemDisplayName \"$i\" | sed 's/\"//g' | awk -F \" = \" '{print $2}');      icons=\"$i/Contents/Resources/$x\";     echo \"$name::$icons::$path\";   done; done"
      
      const apps: string = await cliGet(shScript);
      
      const appArr: string[] = apps.split('\n')
      const allApps: App[] = appArr.map(element =>{
        const appDetails: string[]= element.split('::')
          return {
            name: appDetails[0],
            icon: (element.includes('.icns')) ? (appDetails[1]) : (`${appDetails[1]}.icns`),
            // icon: appDetails[1],
            path: appDetails[2],
          };
      })      

      return allApps.map((app: App) => {
        return Option({
          text: app.name,
          icon: app.icon,
          value: app.path,
        }).build();
      });

    }
  }
}
